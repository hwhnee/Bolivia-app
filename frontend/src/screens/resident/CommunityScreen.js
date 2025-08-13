// (auto-concat)
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { callGeminiAPI } from '../../services/geminiApi';
import PhoneMockup from '../../components/common/PhoneMockup';
import HomeButton from '../../components/common/HomeButton';
import Modal from '../../components/common/Modal';
// --- /src/screens/resident/CommunityScreen.js ---
const CommunityScreen = () => {
    const { showToast, currentUser } = useAppContext();
    const [posts, setPosts] = useState([
        { id: 1, author_id: 2, author_name: 'Pedro Admin', category: 'Anuncios', title: 'Aviso de fumigación de verano en el complejo', content: 'Para mantener un ambiente agradable para nuestros residentes, llevaremos a cabo la fumigación periódica del complejo como se detalla a continuación. Agradecemos su cooperación.', created_at: '2025-08-08' },
        { id: 2, author_id: 1, author_name: 'Juan Residente', category: 'Mercado', title: 'Vendo bicicleta para niños', content: 'Vendo bicicleta en buen estado a un precio económico porque mi hijo ya creció. Interesados, por favor contactar a la unidad 101-1502.', created_at: '2025-08-10' },
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [formData, setFormData] = useState({ category: 'Foro Libre', title: '', content: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            author_id: currentUser.id,
            author_name: currentUser.username,
            category: formData.category,
            title: formData.title,
            content: formData.content,
            created_at: new Date().toISOString().split('T')[0]
        };
        setPosts(prev => [newPost, ...prev]);
        showToast("La publicación ha sido registrada.");
        setIsFormVisible(false);
        setFormData({ category: 'Foro Libre', title: '', content: '' });
    };

    const openPostModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    return (
        <>
            <PhoneMockup theme="light">
                <div className="relative h-[650px] flex flex-col">
                    <HomeButton />
                    <h3 className="text-xl font-bold text-center mb-4 flex-shrink-0">Comunidad</h3>
                    
                    {!isFormVisible && (
                        <button onClick={() => setIsFormVisible(true)} className="w-full p-3 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 mb-4">
                            + Crear Nueva Publicación
                        </button>
                    )}

                    {isFormVisible && (
                        <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg shadow mb-4 space-y-3">
                            <h4 className="font-semibold">Nueva Publicación</h4>
                            <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded text-sm"><option>Foro Libre</option><option>Mercado</option></select>
                            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Título" className="w-full p-2 border rounded text-sm" required />
                            <textarea name="content" value={formData.content} onChange={handleInputChange} rows="3" placeholder="Escriba el contenido aquí." className="w-full p-2 border rounded text-sm" required></textarea>
                            <div className="flex gap-2">
                                <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded text-sm hover:bg-teal-700">Publicar</button>
                                <button type="button" onClick={() => setIsFormVisible(false)} className="w-full bg-gray-300 text-gray-800 p-2 rounded text-sm hover:bg-gray-400">Cancelar</button>
                            </div>
                        </form>
                    )}

                    <div className="flex-grow overflow-y-auto space-y-2">
                        <h4 className="font-semibold mb-2">Lista de Publicaciones</h4>
                        {posts.map(post => (
                            <div key={post.id} onClick={() => openPostModal(post)} className="bg-white p-3 rounded-lg shadow cursor-pointer">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded-full font-semibold">{post.category}</span>
                                    <span className="text-xs text-gray-400">{post.created_at}</span>
                                </div>
                                <p className="font-bold text-sm mt-2 truncate">{post.title}</p>
                                <p className="text-xs text-gray-500 mt-1">Autor: {post.author_name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </PhoneMockup>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedPost?.title}>
                <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                        <span>Categoría: {selectedPost?.category}</span> | <span>Autor: {selectedPost?.author_name}</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedPost?.content}</p>
                </div>
            </Modal>
        </>
    );
};
export default CommunityScreen;