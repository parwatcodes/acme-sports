import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * The `seedDatabase` function asynchronously seeds the database with NFL teams and users along with
 * their API keys, handling any errors and disconnecting from the database afterwards.
 */
async function seedDatabase() {
  try {
    await seedNFLTeams();
    await seedUsersAndApiKeys();
  } catch (error) {
    console.error("Error seeding database: ", error);
  } finally {
    prisma.$disconnect();
  }
}

seedDatabase();

/**
 * The function `seedNFLTeams` asynchronously seeds NFL teams data into a database using Prisma client.
 */
async function seedNFLTeams() {
  console.info('Seeding NFL teams...');
  const { default: nflTeams } = await import("./data/nfl_teams.json", { with: { type: "json" } });

  await prisma.team.createMany({
    data: nflTeams,
    skipDuplicates: true
  });
  console.info('NFL teams seeded successfully.');
}

/**
 * The function `seedUsersAndApiKeys` seeds a default user and creates an API key associated with that
 * user using Prisma.
 */
async function seedUsersAndApiKeys() {
  console.info("Seeding users and creating API key...");
  const { default: users } = await import('./data/users.json', { with: { type: "json" } });

  const [defaultUser] = users;

  const user = await prisma.user.create({
    data: defaultUser
  });

  const apiKey = await prisma.apiKey.create({
    data: {
      userId: user.id
    }
  });

  console.info("Users and api key seeded successfully");
  console.log('================API KEY==================');
  console.info(apiKey.key);
  console.log('================API KEY==================');
}
