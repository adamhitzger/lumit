import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"
import xmlrpc from "xmlrpc"
import { GetHashOutput, LoginOutput,  ListOfCarsOutput , UrlQueryParams, CarWithPhotos} from "@/types"
import qs from "query-string";
import { sanityFetch } from "@/sanity/lib/client"
import { getCar  } from "@/sanity/lib/query"

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

const LOGIN = process.env.SAUTO_MAIL!
const PASSWORD = process.env.SAUTO_PASSWORD!;
const SOFTWARE_KEY = process.env.SAUTO_SOFTWARE_KEY!;

// Vytvoření zabezpečeného XML-RPC klienta
const client = xmlrpc.createSecureClient({
  host: 'import.sauto.cz',
  path: '/RPC2',
  port: 443
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

export async function getSautoCardCar(offset:number =0,limit: number = 20): Promise<{cars: CarWithPhotos[], discountCars: CarWithPhotos[]}> {
  const cars: CarWithPhotos[] = [];
  const discountCars: CarWithPhotos[] = [];
  const session_id = await authenticate();
  const fetchedCars = await listOfCars(session_id, "all", offset, limit);
 
  for (const c of Object.values(fetchedCars.output.list_of_cars)) {
    const car = await getSautoCar(session_id, c.car_id);
    const id = Number(c.car_id)
    const rawPhotos = await sanityFetch<CarWithPhotos>({ query: getCar, params: {id} });
    const photos: string[] = []
    let title: string="";
    
    if(rawPhotos?.photos.length >0){
    title = rawPhotos.title
    for(let i =0; i<rawPhotos.photos.length;i++) {
      photos.push(rawPhotos.photos[i]);
    }
 const discount = rawPhotos.discount && rawPhotos.discount > 0 ? rawPhotos.discount : 0 as number
    if(discount !== 0){
    const carWithPhotos: CarWithPhotos = {
      ...car.output,
      title,
      photos,
      discount,
      nPrice: rawPhotos.nPrice
    }
     discountCars.push(carWithPhotos);
   
    }else {
      const carWithPhotos: CarWithPhotos = {
      ...car.output,
      title,
      photos,
      nPrice: rawPhotos.nPrice
    }
    cars.push(carWithPhotos);
    }
    }
    
    
  }
  return{
    cars,
    discountCars,
  }
}