import { type SchemaTypeDefinition } from 'sanity'
import { car } from './car'
import { aboutCarousel } from './about'
import { reviews } from './reviews'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, aboutCarousel, reviews],
}
