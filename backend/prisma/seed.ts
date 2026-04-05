import 'dotenv/config';
import { PrismaClient, ShipmentStatus } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding fake shipments...');
  
  // Create an initial mock shipment for the frontend dashboard
  const s1 = await prisma.shipment.create({
    data: {
      trackingId: 'TRK-987654321',
      origin: 'New York, NY',
      originLat: 40.7128,
      originLng: -74.0060,
      destination: 'Los Angeles, CA',
      destinationLat: 34.0522,
      destinationLng: -118.2437,
      status: ShipmentStatus.IN_TRANSIT,
      expectedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
    }
  });

  const s2 = await prisma.shipment.create({
    data: {
      trackingId: 'TRK-123456789',
      origin: 'Chicago, IL',
      originLat: 41.8781,
      originLng: -87.6298,
      destination: 'Houston, TX',
      destinationLat: 29.7604,
      destinationLng: -95.3698,
      status: ShipmentStatus.DELIVERED,
      expectedDelivery: new Date(Date.now() - 1000 * 60 * 60 * 24),
      actualDelivery: new Date(Date.now() - 1000 * 60 * 60 * 12),
    }
  });

  const s3 = await prisma.shipment.create({
    data: {
      trackingId: 'TRK-456789123',
      origin: 'Miami, FL',
      originLat: 25.7617,
      originLng: -80.1918,
      destination: 'Atlanta, GA',
      destinationLat: 33.7490,
      destinationLng: -84.3880,
      status: ShipmentStatus.DELAYED,
      expectedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    }
  });

  const s4 = await prisma.shipment.create({
    data: {
      trackingId: 'TRK-789123456',
      origin: 'Seattle, WA',
      originLat: 47.6062,
      originLng: -122.3321,
      destination: 'Denver, CO',
      destinationLat: 39.7392,
      destinationLng: -104.9903,
      status: ShipmentStatus.PENDING,
      expectedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    }
  });

  console.log(`Seeded ${s1.trackingId}, ${s2.trackingId}, ${s3.trackingId}, ${s4.trackingId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
