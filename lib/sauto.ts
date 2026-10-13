import crypto from "crypto"
import xmlrpc from "xmlrpc"
import { GetHashOutput, LoginOutput,  ListOfCarsOutput , CarWithPhotos, SanityCar} from "@/types"
import { unstable_cache } from "next/cache"
import { sanityFetch } from "@/sanity/lib/client"
import { getCarsByIds } from "@/sanity/lib/query"

const LOGIN = process.env.SAUTO_MAIL!
const PASSWORD = process.env.SAUTO_PASSWORD!;
const SOFTWARE_KEY = process.env.SAUTO_SOFTWARE_KEY!;

// Vytvoření zabezpečeného XML-RPC klienta
const client = xmlrpc.createSecureClient({
  host: 'import.sauto.cz',
  path: '/RPC2',
  port: 443
});


function getHash(login: string): Promise<GetHashOutput> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.methodCall('getHash', [login], (err: any 
      , result: GetHashOutput) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function login(sessionId: string, hash: string, softwareKey: string): Promise<LoginOutput> {
  return new Promise((resolve, reject) => {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.methodCall('login', [sessionId, hash, softwareKey], (err: any
      , result: LoginOutput) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export function listOfCars(sessionId: string, imported: 'all' | 'imported' = 'all', offset = 0, limit: number=-1): Promise<ListOfCarsOutput> {
  return new Promise((resolve, reject) => {
    if(limit === -1){
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.methodCall('listOfCars', [sessionId, imported, offset], (err: any 
      , result: ListOfCarsOutput) => {
      if (err) return reject(err);
      resolve(result);
    });
    }else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.methodCall('listOfCars', [sessionId, imported, offset, limit && limit], (err: any 
      , result: ListOfCarsOutput) => {
      if (err) return reject(err);
      resolve(result);
    });
    }
  });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getSautoCar(sessionId: string, carId: number): Promise<any> {
  
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.methodCall('getCar', [sessionId, carId], (err: any , result: any 
      ) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function listOfEquipment(sessionId: string, carId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.methodCall('listOfEquipment', [sessionId, carId], (err: any , result: any 
      ) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export async function authenticate() {
    const hashResult = await getHash(LOGIN);
    if (hashResult.status !== 200) {
      throw new Error(`getHash error: ${hashResult.status_message}`);
    }

    const { session_id, hash_key } = hashResult.output;
    const inner = crypto.createHash('md5').update(PASSWORD).digest('hex');
    const finalHash = crypto.createHash('md5').update(inner + hash_key).digest('hex');

    const loginResult = await login(session_id, finalHash, SOFTWARE_KEY);
    if (loginResult.status !== 200) {
      throw new Error(`Login failed: ${loginResult.status_message}`);
    }

    console.log('✅ Přihlášení OK! session_id:', session_id);

    return session_id;
  
}

// Sauto API nechceme zahltit, proto getCar voláme paralelně po dávkách
const SAUTO_BATCH_SIZE = 10

async function fetchSautoCardCar(offset: number, limit: number): Promise<{cars: CarWithPhotos[], discountCars: CarWithPhotos[]}> {
  const cars: CarWithPhotos[] = [];
  const discountCars: CarWithPhotos[] = [];
  const session_id = await authenticate();
  const fetchedCars = await listOfCars(session_id, "all", offset, limit);
  const ids = Object.values(fetchedCars.output.list_of_cars).map((c) => Number(c.car_id))

  // Všechna auta ze Sanity jedním dotazem místo dotazu pro každé auto
  const sanityCars = await sanityFetch<SanityCar[]>({ query: getCarsByIds, params: { ids } });
  const sanityById = new Map(sanityCars.map((s) => [s.id, s]))

  // Detail ze Sauto stahujeme jen u aut, která mají fotky v Sanity
  const idsWithPhotos = ids.filter((id) => (sanityById.get(id)?.photos?.length ?? 0) > 0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sautoCars: any[] = []
  for (let i = 0; i < idsWithPhotos.length; i += SAUTO_BATCH_SIZE) {
    const batch = idsWithPhotos.slice(i, i + SAUTO_BATCH_SIZE)
    sautoCars.push(...await Promise.all(batch.map((id) => getSautoCar(session_id, id))))
  }

  idsWithPhotos.forEach((id, i) => {
    const car = sautoCars[i]
    const rawPhotos = sanityById.get(id)!
    const title = rawPhotos.title
    const photos = [...rawPhotos.photos]
    const discount = rawPhotos.discount && rawPhotos.discount > 0 ? rawPhotos.discount : 0
    if(discount !== 0){
      discountCars.push({
        ...car.output,
        title,
        photos,
        discount,
        nPrice: rawPhotos.nPrice
      });
    }else {
      cars.push({
        ...car.output,
        title,
        photos,
        nPrice: rawPhotos.nPrice
      });
    }
  })
  return{
    cars,
    discountCars,
  }
}

// Výsledek se cachuje 5 minut, takže se Sauto nevolá při každém načtení stránky
export const getSautoCardCar = unstable_cache(
  async (offset: number = 0, limit: number = 20) => fetchSautoCardCar(offset, limit),
  ["sauto-card-cars"],
  { revalidate: 300, tags: ["cars"] }
)