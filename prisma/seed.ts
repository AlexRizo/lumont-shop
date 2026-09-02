import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Atributos reutilizables entre categorías de producto
  const colorAttr = await prisma.attribute.upsert({
    where: { name: 'Color' },
    update: {},
    create: { name: 'Color' },
  })
  const lengthAttr = await prisma.attribute.upsert({
    where: { name: 'Longitud' },
    update: {},
    create: { name: 'Longitud' },
  })

  const negro = await prisma.attributeValue.upsert({
    where: { attributeId_value: { attributeId: colorAttr.id, value: 'Negro natural' } },
    update: {},
    create: { attributeId: colorAttr.id, value: 'Negro natural' },
  })
  const castano = await prisma.attributeValue.upsert({
    where: { attributeId_value: { attributeId: colorAttr.id, value: 'Castaño' } },
    update: {},
    create: { attributeId: colorAttr.id, value: 'Castaño' },
  })
  const in20 = await prisma.attributeValue.upsert({
    where: { attributeId_value: { attributeId: lengthAttr.id, value: '20 pulgadas' } },
    update: {},
    create: { attributeId: lengthAttr.id, value: '20 pulgadas' },
  })

  // Categorías
  const hairCategory = await prisma.category.upsert({
    where: { slug: 'cabello-humano' },
    update: {},
    create: {
      name: 'Cabello 100% Humano',
      slug: 'cabello-humano',
      description: 'Extensiones de cabello natural, remy y virgen.',
    },
  })

  const careCategory = await prisma.category.upsert({
    where: { slug: 'cuidado-capilar' },
    update: {},
    create: {
      name: 'Cuidado Capilar',
      slug: 'cuidado-capilar',
      description: 'Shampoos, geles y tratamientos.',
    },
  })

  // Producto con variantes (cabello)
  await prisma.product.upsert({
    where: { slug: 'extension-clip-in-remy' },
    update: {},
    create: {
      name: 'Extensión Clip-In Remy',
      slug: 'extension-clip-in-remy',
      description: 'Extensión de cabello 100% humano, calidad Remy, corte doble dibujo.',
      status: 'ACTIVE',
      categoryId: hairCategory.id,
      images: {
        create: [{ url: 'https://placehold.co/600x600', altText: 'Extensión clip-in', position: 0 }],
      },
      variants: {
        create: [
          {
            sku: 'EXT-CLIP-NEG-20',
            price: '899.00',
            stock: 15,
            attributeValues: {
              create: [{ attributeValueId: negro.id }, { attributeValueId: in20.id }],
            },
          },
          {
            sku: 'EXT-CLIP-CAS-20',
            price: '899.00',
            stock: 8,
            attributeValues: {
              create: [{ attributeValueId: castano.id }, { attributeValueId: in20.id }],
            },
          },
        ],
      },
    },
  })

  // Producto simple (shampoo, una sola variante)
  await prisma.product.upsert({
    where: { slug: 'shampoo-hidratante-keratina' },
    update: {},
    create: {
      name: 'Shampoo Hidratante con Keratina',
      slug: 'shampoo-hidratante-keratina',
      description: 'Fórmula libre de sulfatos, ideal para cabello natural y extensiones.',
      status: 'ACTIVE',
      categoryId: careCategory.id,
      images: {
        create: [{ url: 'https://placehold.co/600x600', altText: 'Shampoo hidratante', position: 0 }],
      },
      variants: {
        create: [{ sku: 'SHP-KER-250', price: '249.00', stock: 40 }],
      },
    },
  })

  console.log('✅ Seed completado')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())