import { defineField, defineType } from 'sanity'

export const headerCarousel = defineType({
  name: 'headerCarousel',
  title: 'Header Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Položky karuselu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'textCs',
              title: 'Text v CZ',
              type: 'string',
              
            }),
            defineField({
              name: 'textEn',
              title: 'Text v EN',
              type: 'string',
              
            }),
            defineField({
              name: 'media',
              title: 'Soubor',
              type: 'image',
              validation: Rule =>
                Rule.required()
            }),
            defineField({
              name: 'link',
              title: 'Odkaz',
              type: 'string',
              description: 'URL odkaz pro tuto položku karuselu',
              
            })
          ],
        }
      ],
      validation: Rule => Rule.required().min(1).error('Karusel musí obsahovat alespoň jednu položku')
    })
  ]
})