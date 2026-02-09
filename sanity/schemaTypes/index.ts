import { type SchemaTypeDefinition } from 'sanity'
import { car } from './car'
import { aboutCarousel } from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, aboutCarousel],
}
