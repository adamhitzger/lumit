import { type SchemaTypeDefinition } from 'sanity'
import { car } from './car'
import { headerCarousel } from './header'
import { aboutCarousel } from './about'
import { reviews } from './reviews'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, headerCarousel, aboutCarousel, reviews],
}
