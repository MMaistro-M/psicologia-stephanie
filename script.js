// ============================================
// CONFIGURAÇÃO DO FIREBASE (COM SEUS DADOS)
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyAVbQpgpgx_O0Qr8UjyeeI4OyyC6fHBF0Y",
    authDomain: "site-psicologa-29375.firebaseapp.com",
    projectId: "site-psicologa-29375",
    storageBucket: "site-psicologa-29375.firebasestorage.app",
    messagingSenderId: "77814198358",
    appId: "1:77814198358:web:c351c16f6785b612314bf7"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ============================================
// FUNÇÃO PARA SCROLL SUAVE
// ============================================
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// ENVIO DO FORMULÁRIO PARA O FIREBASE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContato');
    const feedbackDiv = document.getElementById('formFeedback');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            // Validações
            if (!nome || !email || !whatsapp) {
                feedbackDiv.innerHTML = '<span style="color: #e74c3c;">❌ Preencha nome, e-mail e WhatsApp.</span>';
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                feedbackDiv.innerHTML = '<span style="color: #e74c3c;">❌ Email inválido.</span>';
                return;
            }

            // Mostrar carregando
            feedbackDiv.innerHTML = '<span style="color: #7a4a2a;">📤 Enviando...</span>';

            const dadosContato = {
                nome: nome,
                email: email,
                whatsapp: whatsapp,
                mensagem: mensagem,
                dataEnvio: new Date().toISOString(),
                status: 'novo'
            };

            try {
                // Salvar no Firebase Firestore
                await db.collection('agendamentos').add(dadosContato);
                
                // Sucesso
                feedbackDiv.innerHTML = '<span style="color: #27ae60;">✅ Mensagem enviada com sucesso! Agradeço o interesse, em breve entrarei em contato.</span>';
                form.reset();
                
                // Limpar mensagem após 5 segundos
                setTimeout(() => {
                    feedbackDiv.innerHTML = '';
                }, 5000);
                
            } catch (error) {
                console.error('Erro ao salvar no Firebase:', error);
                feedbackDiv.innerHTML = '<span style="color: #e74c3c;">❌ Erro ao enviar. Tente novamente ou me chame diretamente no WhatsApp.</span>';
            }
        });
    }
});

console.log('🚀 Site conectado ao Firebase! Os agendamentos serão salvos no Firestore.');
console.log('📊 Para ver os dados: https://console.firebase.google.com/');