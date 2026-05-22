// ============================================
// NÚMERO DO WHATSAPP DA PSICÓLOGA
// ============================================
// ALTERE AQUI PARA O SEU NÚMERO COM DDD
const NUMERO_PSICOLOGA = "5519999959009";

// ============================================
// SCROLL SUAVE
// ============================================
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// ENVIO DO FORMULÁRIO DIRETO PARA O WHATSAPP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formContato');
    const feedbackDiv = document.getElementById('formFeedback');

    if (form) {
        form.addEventListener('submit', (e) => {
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

            // Monta a mensagem
            let textoWhatsApp = `🆕 *NOVO AGENDAMENTO!*%0A%0A`;
            textoWhatsApp += `*Nome:* ${nome}%0A`;
            textoWhatsApp += `*E-mail:* ${email}%0A`;
            textoWhatsApp += `*WhatsApp:* ${whatsapp}%0A`;
            
            if (mensagem) {
                textoWhatsApp += `*Mensagem:* ${mensagem}%0A`;
            }
            
            textoWhatsApp += `%0A📅 *Data:* ${new Date().toLocaleString('pt-BR')}%0A`;
            textoWhatsApp += `%0A Responda diretamente por aqui! ✅`;

            // Link do WhatsApp
            const linkWhatsApp = `https://wa.me/${NUMERO_PSICOLOGA}?text=${textoWhatsApp}`;

            // Feedback
            feedbackDiv.innerHTML = '<span style="color: #27ae60;">✅ Abrindo WhatsApp... Envie a mensagem para confirmar!</span>';
            
            // Limpa o formulário
            form.reset();

            // Abre o WhatsApp
            setTimeout(() => {
                window.open(linkWhatsApp, '_blank');
                
                setTimeout(() => {
                    feedbackDiv.innerHTML = '<span style="color: #7a4a2a;">📱 Não esqueça de clicar em "Enviar" no WhatsApp!</span>';
                    setTimeout(() => {
                        feedbackDiv.innerHTML = '';
                    }, 8000);
                }, 1000);
            }, 500);
        });
    }
});

console.log('🚀 Formulário configurado para enviar mensagens direto para o WhatsApp!');
console.log('📱 Número configurado:', NUMERO_PSICOLOGA);