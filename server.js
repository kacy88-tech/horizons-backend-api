// --- Backend para Interface Horizons (Node.js/Express) ---
//
// Este é um servidor Express simples que simula os endpoints necessários
// para processar as requisições da sua interface no Horizons.
// Ele inclui:
// 1. Configuração de CORS para permitir requisições do frontend.
// 2. Manipulação básica de upload de arquivos (usando 'multer').
// 3. Endpoints de simulação para geração de conteúdo (Imagens, Vídeos, Avatares).
// 4. Endpoint de simulação para atualização de configurações (Aspect Ratio, Qualidade, etc.).
//
// Para executar este servidor, certifique-se de ter Node.js instalado e execute os comandos:
// npm init -y
// npm install express cors multer
// node server.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use a porta do ambiente (Railway) ou 3000

// Configuração de CORS: Permite que seu frontend (Horizons) se conecte ao backend.
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Configuração para processar JSON no corpo das requisições
app.use(express.json());

// --- Configuração Multer para Upload de Arquivos ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor Backend do Horizons em execução. Pronto para aceitar requisições de API!');
});

// =======================================================
// 1. ENDPOINT DE UPLOAD DE ARQUIVOS
// =======================================================
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Nenhum arquivo enviado.' });
    }

    console.log(`Arquivo recebido: ${req.file.originalname}, Tamanho: ${req.file.size} bytes`);

    res.status(200).json({
        success: true,
        message: 'Upload de arquivo processado com sucesso!',
        fileInfo: {
            name: req.file.originalname,
            size: req.file.size,
            mimeType: req.file.mimetype,
            resourceId: `uploaded-file-${Date.now()}`
        }
    });
});

// =======================================================
// 2. ENDPOINTS DE GERAÇÃO DE CONTEÚDO
// =======================================================

const simulateGeneration = (type, req, res) => {
    console.log(`Simulando a geração de: ${type}. Prompt: "${req.body.prompt}"`);

    // Atraso simulado (5 segundos)
    setTimeout(() => {
        const resultUrl = `https://generated-content-cdn.com/${type}-${Date.now()}.png`;
        const metadata = {
            aspectRatio: req.body.aspectRatio || '16:9',
            qualityMode: req.body.qualityMode || 'Standard',
            avatarUsed: req.body.avatarId || 'none'
        };

        res.status(200).json({
            success: true,
            message: `${type} gerado com sucesso!`,
            resultUrl: resultUrl,
            metadata: metadata
        });
    }, 5000);
};

// Geração de Imagem
app.post('/api/generate/image', (req, res) => {
    simulateGeneration('Imagem', req, res);
});

// Geração de Vídeo Curto
app.post('/api/generate/short-video', (req, res) => {
    simulateGeneration('Vídeo Curto', req, res);
});

// Geração de Vídeo Longo (Assíncrono simulado)
app.post('/api/generate/long-video', (req, res) => {
    const jobId = `job-video-long-${Date.now()}`;
    console.log(`Iniciando trabalho assíncrono: ${jobId}`);

    res.status(202).json({
        success: true,
        message: 'Geração de vídeo longo iniciada. Use o endpoint de status para verificar.',
        jobId: jobId
    });

    // Simula o processamento em segundo plano (20 segundos)
    setTimeout(() => {
        console.log(`Trabalho ${jobId} concluído. URL de resultado: https://generated-content-cdn.com/${jobId}.mp4`);
    }, 20000);
});

// Geração de Avatar
app.post('/api/generate/avatar', (req, res) => {
    setTimeout(() => {
        const avatarId = `avatar-${Date.now()}`;
        res.status(200).json({
            success: true,
            message: 'Avatar gerado com sucesso!',
            avatarId: avatarId,
            avatarUrl: `https://avatar-cdn.com/${avatarId}.png`
        });
    }, 3000);
});


// =======================================================
// 3. ENDPOINT DE CONFIGURAÇÃO
// =======================================================
app.post('/api/settings/update', (req, res) => {
    const { aspectRatio, qualityMode, autoSound, autoSpeech } = req.body;

    console.log('Recebidas novas configurações:');
    console.log(`- Aspect Ratio: ${aspectRatio}`);
    console.log(`- Quality Mode: ${qualityMode}`);
    console.log(`- Auto Sound: ${autoSound}`);
    console.log(`- Auto Speech: ${autoSpeech}`);

    res.status(200).json({
        success: true,
        message: 'Configurações atualizadas com sucesso.',
        currentSettings: req.body
    });
});


// =======================================================
// 4. INICIALIZAÇÃO DO SERVIDOR
// =======================================================
app.listen(PORT, () => {
    console.log(`Servidor de Backend Horizons em execução em http://localhost:${PORT}`);
    console.log(`URL do Backend para configurar no Horizons: http://localhost:${PORT}`);
});
