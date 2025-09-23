import { defineField, defineType } from 'sanity'

export const car = defineType({
  name: 'vehicle',
  title: 'Vozidlo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Název inzerátu',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "id",
      title: "ID",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    // FOTKY
    defineField({
      name: 'images',
      type: 'array',
      title: 'Fotografie',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "discount",
      title: "Sleva v procentech",
      type: "number",
      validation: Rule => Rule.integer().min(0)
    }),
  ],
 
})
