const { createClient } = require('bedrock-protocol');
const mcData = require('minecraft-data')('bedrock_1.21.0');

// Konfigurasi bot
const botOptions = {
  host: 'IP Server',
  port: Port Server,
  username: 'Bot_' + Math.floor(Math.random() * 10000), // Nama pengguna bot secara acak
  offline: true, // Mengaktifkan mode offline (crack)
  connectTimeout: 30000 // Timeout dalam milidetik (30 detik)
};

const client = createClient(botOptions);

client.on('join', () => {
  console.log(`Bot ${botOptions.username} berhasil masuk ke server!`);
  moveRandomly();
});

function moveRandomly() {
  setInterval(() => {
    if (!client.entity || !client.entity.position) {
      console.log('Menunggu inisialisasi posisi entitas...');
      return;
    }

    const directions = ['forward', 'back', 'left', 'right'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const time = Math.floor(Math.random() * 1000) + 500; // Durasi gerakan antara 500ms hingga 1500ms

    client.queue('move_player', {
      position: {
        x: client.entity.position.x + (Math.random() * 2 - 1),
        y: client.entity.position.y,
        z: client.entity.position.z + (Math.random() * 2 - 1),
        yaw: Math.random() * 360,
        pitch: Math.random() * 360
      },
      mode: 0,
      onGround: true,
      entityRuntimeId: client.entity.runtimeId,
      tick: 0,
    });

    console.log(`Bot bergerak ke ${direction} selama ${time} ms`);
  }, 2000);
}

client.on('error', (err) => {
  console.log(`Terjadi kesalahan: ${err.message}`);
});

client.on('end', () => {
  console.log('Bot terputus dari server, mencoba untuk menghubungkan kembali...');
  setTimeout(() => {
    const newClient = createClient(botOptions);
    newClient.on('join', moveRandomly);
  }, 5000);
});
