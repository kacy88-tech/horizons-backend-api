// --------------------------------------------------------
// ARQUIVO: server.js
// FUNÇÃO: Backend simulado para o Horizons AI Studio
//
// Esta versão usa a variável de ambiente 'process.env.PORT'
// fornecida pelo Railway, o que é CRUCIAL para o servidor 
// iniciar corretamente e resolver o erro de conexão pública.
// --------------------------------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// A CORREÇÃO ESTÁ AQUI: Usa a variável de ambiente do Railway (process.env.PORT)
// Caso não esteja definida (ex: rodando localmente), usa 3000 como fallback.
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(cors()); // Permite requisições do frontend (sua interface Horizons)
app.use(bodyParser.json()); // Analisa o corpo das requisições JSON

// --------------------------------------------------------
// Rota de Teste Simples (Rota Raiz)
// --------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Horizons AI Backend está ativo e funcionando! A porta é controlada pelo Railway.');
});

// --------------------------------------------------------
// 1. Rota de Geração de Imagem
// URL: /api/generate/image
// --------------------------------------------------------
app.post('/api/generate/image', (req, res) => {
    const { prompt, aspectRatio, qualityMode } = req.body;
    console.log(`Requisição de Imagem recebida: ${prompt}`);

    // Simula um atraso de processamento de 5 segundos
    setTimeout(() => {
        const simulatedUrl = `https://placehold.co/800x450/1c2630/FFFFFF?text=Imagem%20Gerada%20por%20IA`;

        res.json({
            success: true,
            message: 'Imagem gerada com sucesso.',
            resultUrl: simulatedUrl,
            metadata: {
                aspectRatio: aspectRatio || '16:9',
                qualityMode: qualityMode || 'HD',
                prompt,
                model: 'Horizons-v3-Flash'
            }
        });
    }, 5000); 
});

// --------------------------------------------------------
// 2. Rota de Geração de Vídeo Curto
// --------------------------------------------------------
app.post('/api/generate/short-video', (req, res) => {
    const { prompt } = req.body;
    console.log(`Requisição de Vídeo Curto recebida: ${prompt}`);

    // Simula um atraso de processamento de 5 segundos
    setTimeout(() => {
        res.json({
            success: true,
            message: 'Vídeo Curto processado com sucesso.',
            resultUrl: 'https://placehold.co/800x450/000000/FFFFFF?text=VIDEO_5s_FINAL',
            metadata: {
                aspectRatio: '16:9',
                qualityMode: 'Standard',
                duration: '5s'
            }
        });
    }, 5000);
});

// --------------------------------------------------------
// 3. Rota de Início de Vídeo Longo (Assíncrono)
// --------------------------------------------------------
app.post('/api/generate/long-video', (req, res) => {
    const { prompt } = req.body;
    console.log(`Requisição de Vídeo Longo iniciada: ${prompt}`);

    // Simula o início de um trabalho assíncrono e retorna um ID
    const jobId = 'job-' + Date.now();

    res.json({
        success: true,
        message: 'Trabalho de vídeo longo iniciado.',
        jobId: jobId
    });
});

// --------------------------------------------------------
// 4. Rota de Geração de Avatar (Simulação de Treinamento)
// --------------------------------------------------------
app.post('/api/generate/avatar', (req, res) => {
    const { name, fileName } = req.body;
    console.log(`Iniciando treinamento de avatar: ${name} com arquivo: ${fileName}`);

    // Simula o atraso de treinamento (3 segundos)
    setTimeout(() => {
        const avatarId = 'avtr-' + Math.random().toString(36).substring(2, 9);
        res.json({
            success: true,
            message: `Avatar ${name} treinado e pronto.`,
            avatarId: avatarId,
            avatarUrl: `https://placehold.co/100x100/30363d/4c8bf5?text=AVATAR`
        });
    }, 3000);
});

// --------------------------------------------------------
// 5. Rota de Atualização de Configurações
// --------------------------------------------------------
app.post('/api/settings/update', (req, res) => {
    const { aspectRatio, qualityMode, autoSound, autoSpeech } = req.body;
    console.log('Configurações atualizadas');
    
    res.json({
        success: true,
        message: 'Configurações atualizadas com sucesso.',
        currentSettings: { aspectRatio, qualityMode, autoSound, autoSpeech }
    });
});


// --------------------------------------------------------
// Inicia o Servidor
// --------------------------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Horizons Backend API rodando na porta ${PORT}`);
});
