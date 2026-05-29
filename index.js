const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Configuration du client avec le chemin Chromium de Termux
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/data/data/com.termux/files/usr/bin/chromium',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--headless',
            '--disable-gpu'
        ]
    }
});

// Fonction pour simuler un délai humain (en millisecondes)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Génération du QR Code dans le terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('👉 SCANNE CE QR CODE AVEC LE WHATSAPP DU CLIENT :');
});

// Message de confirmation de connexion
client.on('ready', () => {
    console.log('🚀 Le Bot ivoirien est en ligne et sécurisé !');
});

// Logique de réponse automatique
client.on('message', async msg => {
    const message = msg.body.toLowerCase();
    const chat = await msg.getChat();

    // 1. Détection des mots-clés de bienvenue
    if (message === 'bonjour' || message === 'salut' || message === 'mambo' || message === 'bot') {
        await chat.sendStateTyping();
        await sleep(3000); // Attend 3 secondes en affichant "En train d'écrire..."
        await msg.reply('Bonjour ! Bienvenue chez *[Nom de l\'entreprise]*. ✨\n\nQue souhaitez-vous faire ?\n1️⃣ Voir le catalogue / Passer commande\n2️⃣ Tarifs de livraison 📍\n3️⃣ Parler à un conseiller 👤\n\n*Répondez simplement en tapant le chiffre (ex: 1)*');
    }
    
    // 2. Option 1 : Catalogue
    else if (message === '1') {
        await chat.sendStateTyping();
        await sleep(2500);
        await msg.reply('Voici nos articles disponibles actuellement :\n\n👗 *Article A* : 5 000 FCFA\n👜 *Article B* : 10 000 FCFA\n\nPour commander, répondez exactement avec :\n*Commande: [Votre Nom] - [Article] - [Votre Quartier]*');
    } 
    
    // 3. Option 2 : Livraisons
    else if (message === '2') {
        await chat.sendStateTyping();
        await sleep(2000);
        await msg.reply('📍 *Tarifs de livraison en Côte d\'Ivoire :*\n\n🏍️ *Abidjan (Zone centre)* : 1 000 FCFA\n🏍️ *Abidjan (Périphérie)* : 1 500 - 2 000 FCFA\n🚌 *Intérieur du pays* : Expédition (UTB, AVS, etc.) : 3 000 FCFA');
    } 
    
    // 4. Option 3 : Conseiller Humain
    else if (message === '3') {
        await chat.sendStateTyping();
        await sleep(2000);
        await msg.reply('Un conseiller humain a été alerté et va prendre le relais sur cette discussion d\'ici quelques instants. Merci de patienter ! 🙏');
    }
    
    // 5. Traitement d'une commande
    else if (message.startsWith('commande:')) {
        const detailsCommande = msg.body.slice(9);
        await chat.sendStateTyping();
        await sleep(4000);
        await msg.reply(`✅ *Commande enregistrée !*\n\n*Détails :* ${detailsCommande}\n\nUn agent va vérifier le stock et vous contacter pour le paiement (*Wave, Orange Money ou MTN*). Merci pour votre confiance ! 🇨🇮`);
    }
});

// Initialisation du bot
client.initialize();
