const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

(async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Beginner' },
        { name: 'Web Development' },
        { name: 'Advance Web Development' },
        { name: 'Mobile Development' },
        { name: 'Junior' },
        { name: 'Strong Junior' },
      ],
    });

    console.log('Success');
    //
  } catch (error) {
    console.error('Error seeding the db category', error);
  } finally {
    await database.$disconnect();
  }
})();
