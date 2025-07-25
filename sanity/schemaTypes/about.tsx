import { defineField, defineType } from 'sanity'

export const aboutCarousel = defineType({
  name: 'aboutCarousel',
  title: 'Skece O nás',
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
              name: 'isImage',
              title: 'Video nebo Fotka',
              type: 'boolean',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'media',
              title: 'Soubor',
              type: 'file',
              description: 'Nahrajte fotku nebo video (pouze MP4 pro video)',
              options: {
                accept: 'image/*,video/mp4'
              },
              validation: Rule =>
                Rule.required()
            }),
          ],
        }
      ],
      validation: Rule => Rule.required().min(1).error('Karusel musí obsahovat alespoň jednu položku')
    })
  ]
})