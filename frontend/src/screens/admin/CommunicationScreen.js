// (auto-concat)
import React, { useState } from 'react';
import { callGeminiAPI } from '../../services/geminiApi';
// --- /src/screens/admin/CommunicationScreen.js ---
const CommunicationScreen = () => {
    const [prompt, setPrompt] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleGenerate = async () => {
        if (!prompt) { setStatus('Por favor, ingrese el contenido principal del anuncio.'); return; }
        setIsLoading(true);
        setStatus('✨ La IA está redactando el anuncio...');
        const fullPrompt = `Basado en el siguiente contenido clave, redacta un anuncio oficial para los residentes del condominio en español. El tono debe ser cortés y claro: "${prompt}". Incluye título, propósito, fecha/hora y puntos de cooperación para los residentes.`;
        const result = await callGeminiAPI(fullPrompt);
        setContent(result);
        setStatus('¡Redacción completada!');
        setIsLoading(false);
    };
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-sky-700">✨ Redactar Anuncios con IA</h2>
            <div className="space-y-4">
                <div><label htmlFor="announcement-prompt" className="font-semibold text-gray-700">Contenido Clave del Anuncio</label><input id="announcement-prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" placeholder="Ej: Inspección regular del ascensor el 1 de agosto" className="w-full mt-1 p-2 border rounded-md" /></div>
                <button onClick={handleGenerate} disabled={isLoading} className="w-full p-3 rounded bg-gradient-to-r from-fuchsia-600 to-violet-500 hover:from-fuchsia-700 hover:to-violet-600 text-white font-bold transition-colors disabled:opacity-50">{isLoading ? 'Redactando...' : '✨ Redactar borrador con IA'}</button>
                <div className="text-sm text-center text-fuchsia-600 h-4">{status}</div>
                <div><label htmlFor="announcement-content" className="font-semibold text-gray-700">Borrador de Anuncio Generado</label><textarea id="announcement-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="El contenido del anuncio generado por la IA aparecerá aquí." rows="8" className="w-full mt-1 p-2 border rounded-md bg-gray-50"></textarea></div>
                <button className="w-full p-3 rounded bg-sky-600 text-white hover:bg-sky-700 font-bold transition-colors">Enviar a todos los residentes</button>
            </div>
        </div>
    );
};
export default CommunicationScreen;