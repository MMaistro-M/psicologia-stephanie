// ============================================
// NÚMERO DO WHATSAPP DA PSICÓLOGA
// ============================================
// ALTERE AQUI PARA O SEU NÚMERO COM DDD
// Exemplo: 5511999999999 (55 Brasil + 11 DDD + 999999999 número)
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
// ENVIO DO FORMULÁRIO PARA O WHATSAPP
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

            if (!nome || !email || !whatsapp) {
                feedbackDiv.innerHTML = '<span style="color: #e74c3c;"> Preencha nome, e-mail e WhatsApp.</span>';
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                feedbackDiv.innerHTML = '<span style="color: #e74c3c;"> Email inválido.</span>';
                return;
            }

            let textoWhatsApp = ` *NOVO AGENDAMENTO!*%0A%0A`;
            textoWhatsApp += `*Nome:* ${nome}%0A`;
            textoWhatsApp += `*E-mail:* ${email}%0A`;
            textoWhatsApp += `*WhatsApp:* ${whatsapp}%0A`;
            
            if (mensagem) {
                textoWhatsApp += `*Mensagem:* ${mensagem}%0A`;
            }
            
            textoWhatsApp += `%0A *Data:* ${new Date().toLocaleString('pt-BR')}%0A`;
            textoWhatsApp += `%0A Responda diretamente por aqui! `;

            const linkWhatsApp = `https://wa.me/${NUMERO_PSICOLOGA}?text=${textoWhatsApp}`;

            feedbackDiv.innerHTML = '<span style="color: #27ae60;"> Redirecionando para o WhatsApp... Clique em "Enviar" para confirmar o agendamento.</span>';
            
            form.reset();

            setTimeout(() => {
                window.open(linkWhatsApp, '_blank');
                feedbackDiv.innerHTML = '<span style="color: #7a4a2a;">📱 Você será redirecionado ao WhatsApp. Envie a mensagem para confirmar!</span>';
                
                setTimeout(() => {
                    feedbackDiv.innerHTML = '';
                }, 8000);
            }, 1000);
        });
    }
});

console.log('🚀 Formulário configurado para enviar mensagens direto para o WhatsApp!');