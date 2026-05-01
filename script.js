// Função para scroll suave
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Configuração da API (backend)
const API_BASE_URL = 'http://localhost:3000/api/contato';

// Aguardar o DOM carregar
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
                feedbackDiv.innerHTML = '<span class="text-danger">❌ Preencha nome, e-mail e WhatsApp.</span>';
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                feedbackDiv.innerHTML = '<span class="text-danger">❌ Email inválido.</span>';
                return;
            }

            const dadosContato = {
                nome,
                email,
                whatsapp,
                mensagem,
                dataEnvio: new Date().toISOString()
            };

            // Tentar enviar para o backend
            try {
                const response = await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosContato)
                });

                if (response.ok) {
                    const resultado = await response.json();
                    feedbackDiv.innerHTML = '<span class="text-success">✅ Contato salvo com sucesso no MongoDB! Agradeço o interesse, em breve retornarei.</span>';
                    form.reset();
                    setTimeout(() => {
                        feedbackDiv.innerHTML = '';
                    }, 5000);
                } else {
                    fallbackSalvarLocal(dadosContato);
                }
            } catch (error) {
                console.warn('Backend MongoDB não encontrado, usando fallback local.', error);
                fallbackSalvarLocal(dadosContato);
            }
        });
    }
});

// Fallback para salvar localmente (demo)
function fallbackSalvarLocal(dados) {
    let contatos = JSON.parse(localStorage.getItem('contatos_psi')) || [];
    contatos.push(dados);
    localStorage.setItem('contatos_psi', JSON.stringify(contatos));

    const feedbackDiv = document.getElementById('formFeedback');
    feedbackDiv.innerHTML = `
        <span class="text-info">📋 Dados armazenados localmente (demo).</span><br>
        <small>Nome: ${dados.nome} | Contato salvo como simulação.</small>
    `;

    const form = document.getElementById('formContato');
    form.reset();

    setTimeout(() => {
        if (feedbackDiv.innerHTML.includes('demo')) {
            feedbackDiv.innerHTML = '';
        }
    }, 6000);
}

// Mostrar instruções no console
console.log('🚀 Protótipo pronto! Configure o backend conforme o guia abaixo.');