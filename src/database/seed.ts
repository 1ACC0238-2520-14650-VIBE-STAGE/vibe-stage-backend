import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { ShowsService } from '../shows/shows.service';
import { EventsService } from '../events/events.service';
import * as bcrypt from 'bcrypt';

/**
 * Script para poblar la base de datos con datos iniciales
 * Ejecutar con: npm run seed
 */
async function bootstrap() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const showsService = app.get(ShowsService);
  const eventsService = app.get(EventsService);

  try {
    // 1. Crear usuarios promotores
    console.log('👤 Creando promotores...');
    const hashedPassword = await bcrypt.hash('123456', 10);

    const promoter1 = await usersService.create({
      name: 'Carlos Promotor',
      email: 'carlos@promotor.com',
      password: hashedPassword,
      role: 'promoter',
      bio: 'Promotor de eventos de rock y metal en Lima',
      phone: '+51 999 888 777',
    });

    const promoter2 = await usersService.create({
      name: 'María Eventos',
      email: 'maria@eventos.com',
      password: hashedPassword,
      role: 'promoter',
      bio: 'Especialista en eventos de jazz y música acústica',
      phone: '+51 988 777 666',
    });

    const promoter3 = await usersService.create({
      name: 'Juan Producciones',
      email: 'juan@producciones.com',
      password: hashedPassword,
      role: 'promoter',
      bio: 'Productor de eventos indie y alternativos',
      phone: '+51 977 666 555',
    });

    console.log('✅ Promotores creados\n');

    // 2. Crear usuarios artistas de prueba
    console.log('🎤 Creando artistas...');

    const artist1 = await usersService.create({
      name: 'Los Rockeros',
      email: 'rockeros@banda.com',
      password: hashedPassword,
      role: 'artist',
      bio: 'Banda de rock alternativo con 5 años de experiencia',
      phone: '+51 966 555 444',
    });

    const artist2 = await usersService.create({
      name: 'Ana Jazz',
      email: 'ana@jazz.com',
      password: hashedPassword,
      role: 'artist',
      bio: 'Cantante de jazz y soul',
      phone: '+51 955 444 333',
    });

    console.log('✅ Artistas creados\n');

    // 3. Crear shows/eventos
    console.log('🎪 Creando shows/eventos...');

    // Shows de Rock
    await showsService.create(
      {
        title: 'Noche de Rock en Barranco',
        description:
          'Buscamos banda de rock alternativo para tocar el viernes por la noche. Local con capacidad para 150 personas. Incluye equipo de sonido profesional.',
        location: 'Barranco Blues Bar, Lima',
        date: '2025-03-15',
        genre: 'Rock',
        artistId: undefined,
        eventId: undefined,
      },
      promoter1.id,
    );

    await showsService.create(
      {
        title: 'Festival Rock Underground',
        description:
          'Festival de 3 bandas de rock indie/alternativo. Escenario al aire libre, público joven y entusiasta.',
        location: 'Parque Kennedy, Miraflores',
        date: '2025-03-20',
        genre: 'Rock',
        artistId: undefined,
        eventId: undefined,
      },
      promoter1.id,
    );

    // Shows de Jazz
    await showsService.create(
      {
        title: 'Jazz Night - Viernes Acústico',
        description:
          'Noche de jazz acústico en café cultural. Ambiente íntimo, público conocedor. Piano disponible.',
        location: 'Jazz Café Central, San Isidro',
        date: '2025-03-18',
        genre: 'Jazz',
        artistId: undefined,
        eventId: undefined,
      },
      promoter2.id,
    );

    await showsService.create(
      {
        title: 'Sunday Jazz Brunch',
        description:
          'Sesión de jazz para brunch dominical. Formato trío o cuarteto. 3 sets de 45 minutos.',
        location: 'La Mar Cebichería, Miraflores',
        date: '2025-03-24',
        genre: 'Jazz',
        artistId: undefined,
        eventId: undefined,
      },
      promoter2.id,
    );

    // Shows Indie/Alternativos
    await showsService.create(
      {
        title: 'Indie Showcase - Nueva Escena',
        description:
          'Buscamos bandas indie/alternativas emergentes. Evento grabado para redes sociales. Gran oportunidad de exposición.',
        location: 'La Noche Cultural, Barranco',
        date: '2025-03-22',
        genre: 'Indie',
        artistId: undefined,
        eventId: undefined,
      },
      promoter3.id,
    );

    await showsService.create(
      {
        title: 'Acústico en Azotea',
        description:
          'Sesión acústica en rooftop bar. Sunset session. Perfecto para solistas o dúos.',
        location: 'Rooftop 360, San Isidro',
        date: '2025-03-28',
        genre: 'Acústico',
        artistId: undefined,
        eventId: undefined,
      },
      promoter3.id,
    );

    // Shows Pop/Electrónica
    await showsService.create(
      {
        title: 'Electro Night - DJ + Live Act',
        description:
          'Buscamos artista para live act de música electrónica. Evento en club con sistema de sonido de primer nivel.',
        location: 'Club Amadeus, Miraflores',
        date: '2025-03-30',
        genre: 'Electrónica',
        artistId: undefined,
        eventId: undefined,
      },
      promoter1.id,
    );

    await showsService.create(
      {
        title: 'Pop Latino - Fiesta Nocturna',
        description:
          'Noche de pop latino y covers. Local grande, público diverso. Se busca energía y carisma.',
        location: 'Discoteca Gótica, Lima Centro',
        date: '2025-04-05',
        genre: 'Pop',
        artistId: undefined,
        eventId: undefined,
      },
      promoter2.id,
    );

    // Shows Reggae/Cumbia
    await showsService.create(
      {
        title: 'Reggae Beach Party',
        description:
          'Evento de reggae en la playa. Ambiente relajado, público festivo. Equipo portátil incluido.',
        location: 'Playa Makaha, Miraflores',
        date: '2025-04-10',
        genre: 'Reggae',
        artistId: undefined,
        eventId: undefined,
      },
      promoter3.id,
    );

    await showsService.create(
      {
        title: 'Cumbia Fusión - Viernes Popular',
        description:
          'Noche de cumbia moderna/fusión. Local amplio, pista de baile. Público joven y bailador.',
        location: 'El Dragón, Pueblo Libre',
        date: '2025-04-12',
        genre: 'Cumbia',
        artistId: undefined,
        eventId: undefined,
      },
      promoter1.id,
    );

    console.log('✅ Shows creados\n');

    // 4. Crear algunos eventos (para el módulo Events si lo usas)
    console.log('📅 Creando eventos adicionales...');

    await eventsService.create(
      {
        name: 'Festival de Música Independiente 2025',
        description:
          'Gran festival con múltiples escenarios. Buscamos bandas de todos los géneros.',
        date: new Date('2025-05-15'),
        location: 'Parque de la Exposición',
        genre: 'Variado',
      },
      promoter3.id,
    );

    await eventsService.create(
      {
        name: 'Circuito de Jazz - Primavera',
        description:
          'Serie de 4 conciertos de jazz en diferentes locales de Lima',
        date: new Date('2025-04-01'),
        location: 'Varios locales',
        genre: 'Jazz',
      },
      promoter2.id,
    );

    console.log('✅ Eventos creados\n');

    console.log('🎉 Seed completado exitosamente!\n');
    console.log('📊 Resumen:');
    console.log('  - 3 Promotores');
    console.log('  - 2 Artistas');
    console.log('  - 10 Shows/Oportunidades');
    console.log('  - 2 Eventos\n');
    console.log('🔑 Credenciales de prueba (password: 123456):');
    console.log('\n  PROMOTORES:');
    console.log('  - carlos@promotor.com');
    console.log('  - maria@eventos.com');
    console.log('  - juan@producciones.com');
    console.log('\n  ARTISTAS:');
    console.log('  - rockeros@banda.com');
    console.log('  - ana@jazz.com\n');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap();
