


import { User, ContactInfo } from './types';

// Deterministic random images for "Fixed Images as Names" concept
// Using Pollinations.ai to generate Biblical themed avatars
export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Pr. Mukai',
    email: 'pr.mukai@gmail.com',
    role: 'admin',
    status: 'approved',
    avatarUrl: 'https://image.pollinations.ai/prompt/oil%20painting%20portrait%20of%20biblical%20Shepherd%20Moses%20staff?width=200&height=200&nologo=true',
    isGCMember: true,
    city: 'São Paulo',
    age: '45',
    loginCount: 120
  },
  {
    id: 'u2',
    name: 'RH',
    email: 'rh@kairos.com',
    role: 'editor',
    status: 'approved',
    avatarUrl: 'https://image.pollinations.ai/prompt/oil%20painting%20portrait%20of%20biblical%20woman%20Esther%20queen?width=200&height=200&nologo=true',
    isGCMember: true,
    city: 'Curitiba',
    age: '30',
    loginCount: 45
  },
  {
    id: 'u3',
    name: 'TI Support',
    email: 'ti@kairos.com',
    role: 'editor',
    status: 'approved',
    avatarUrl: 'https://image.pollinations.ai/prompt/oil%20painting%20portrait%20of%20biblical%20man%20Noah%20builder?width=200&height=200&nologo=true',
    isGCMember: false,
    city: 'Remoto',
    age: '28',
    loginCount: 88
  },
  {
    id: 'u4',
    name: 'Estagiário',
    email: 'visitor@kairos.com',
    role: 'viewer',
    status: 'approved',
    avatarUrl: 'https://image.pollinations.ai/prompt/oil%20painting%20portrait%20of%20biblical%20young%20David%20harp?width=200&height=200&nologo=true',
    isGCMember: false,
    city: 'Campinas',
    age: '20',
    loginCount: 12
  },
  {
    id: 'u5',
    name: 'Diretoria',
    email: 'boss@kairos.com',
    role: 'editor',
    status: 'approved',
    avatarUrl: 'https://image.pollinations.ai/prompt/oil%20painting%20portrait%20of%20biblical%20king%20Solomon?width=200&height=200&nologo=true',
    isGCMember: true,
    city: 'Brasília',
    age: '50',
    loginCount: 200
  },
  // Simulação de Pedido de Moderador
  {
    id: 'u_sim_1',
    name: 'Irmão Lucas (Teste)',
    email: 'lucas.teste@kairos.com',
    role: 'editor', // Atualmente é editor
    status: 'approved',
    avatarUrl: 'https://image.pollinations.ai/prompt/oil%20painting%20portrait%20of%20biblical%20apostle%20Paul%20writing?width=200&height=200&nologo=true',
    isGCMember: true,
    city: 'Toyohashi',
    age: '32',
    loginCount: 15,
    requestedRole: 'admin' // SOLICITAÇÃO PENDENTE AQUI
  }
];

// Dark Mode Optimized Colors (Lighter text on darker, translucent backgrounds)
export const EVENT_COLORS = {
  notice: 'bg-blue-900/40 text-blue-200 border-blue-800',
  news: 'bg-green-900/40 text-green-200 border-green-800',
  urgent: 'bg-red-900/40 text-red-200 border-red-800',
};

export const EVENT_LABELS = {
  notice: 'Avisos',
  news: 'Eventos',
  urgent: 'Importante',
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '080-1234-5678',
  email: 'contato@kairos.com',
  instagram: '@kairos.gc'
};

export const BIBLE_VERSES = [
  { ref: "Salmos 23:1", text: "O Senhor é o meu pastor; de nada terei falta." },
  { ref: "Filipenses 4:13", text: "Tudo posso naquele que me fortalece." },
  { ref: "Jeremias 29:11", text: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro." },
  { ref: "Isaías 41:10", text: "Por isso não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o segurarei com a minha mão direita vitoriosa." },
  { ref: "Provérbios 3:5-6", text: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas." },
  { ref: "Mateus 11:28", text: "Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês." },
  { ref: "Romanos 8:28", text: "Sabemos que Deus age em todas as coisas para o bem daqueles que o amam, dos que foram chamados de acordo com o seu propósito." },
  { ref: "Josué 1:9", text: "Não fui eu que ordenei a você? Seja forte e corajoso! Não se apavore nem desanime, pois o Senhor, o seu Deus, estará com você por onde você andar." },
  { ref: "Salmos 46:1", text: "Deus é o nosso refúgio e a nossa fortaleza, auxílio sempre presente na adversidade." },
  { ref: "João 3:16", text: "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna." },
  { ref: "Gálatas 5:22-23", text: "Mas o fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão e domínio próprio. Contra essas coisas não há lei." },
  { ref: "1 Coríntios 13:4-7", text: "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor. O amor não se alegra com a injustiça, mas se alegra com a verdade. Tudo sofre, tudo crê, tudo espera, tudo suporta." },
  { ref: "Isaías 40:31", text: "Mas aqueles que esperam no Senhor renovam as suas forças. Voam alto como águias; correm e não ficam exaustos, andam e não se cansam." },
  { ref: "Salmos 119:105", text: "A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho." },
  { ref: "Mateus 6:33", text: "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça, e todas essas coisas lhes serão acrescentadas." },
  { ref: "Romanos 12:12", text: "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração." },
  { ref: "2 Timóteo 1:7", text: "Pois Deus não nos deu espírito de covardia, mas de poder, de amor e de equilíbrio." },
  { ref: "Hebreus 11:1", text: "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos." },
  { ref: "Salmos 91:1-2", text: "Aquele que habita no abrigo do Altíssimo e descansa à sombra do Todo-poderoso pode dizer ao Senhor: Tu és o meu refúgio e a minha fortaleza, o meu Deus, em quem confio." },
  { ref: "Efésios 2:8-9", text: "Pois vocês são salvos pela graça, por meio da fé, e isto não vem de vocês, é dom de Deus; não por obras, para que ninguém se glorie." },
  { ref: "Provérbios 4:23", text: "Acima de tudo, guarde o seu coração, pois dele depende toda a sua vida." },
  { ref: "Tiago 1:5", text: "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente, de boa vontade; e lhe será concedida." },
  { ref: "1 Pedro 5:7", text: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês." },
  { ref: "Colossenses 3:23", text: "Tudo o que fizerem, façam de todo o coração, como para o Senhor, e não para os hombres." },
  { ref: "Salmos 37:4", text: "Deleite-se no Senhor, e ele atenderá aos desejos do seu coração." },
  { ref: "João 14:6", text: "Respondeu Jesus: Eu sou o caminho, a verdade e a vida. Ninguém vem ao Pai, a não ser por mim." },
  { ref: "Isaías 53:5", text: "Mas ele foi transpassado por causa das nossas transgressões, foi esmagado por causa de nossas iniquidades; o castigo que nos trouxe paz estava sobre ele, e pelas suas feridas fomos curados." },
  { ref: "Mateus 28:20", text: "E eu estarei sempre com vocês, até o fim dos tempos." },
  { ref: "Salmos 121:1-2", text: "Levanto os meus olhos para os montes e pergunto: De onde me vem o socorro? O meu socorro vem do Senhor, que fez os céus e a terra." },
  { ref: "Lamentações 3:22-23", text: "Graças ao grande amor do Senhor é que não somos consumidos, pois as suas misericórdias são inesgotáveis. Renovam-se a cada manhã; grande é a tua fidelidade!" },
  { ref: "Apocalipse 21:4", text: "Ele enxugará dos seus olhos toda lágrima. Não haverá mais morte, nem tristeza, nem choro, nem dor, pois a antiga ordem já passou." }
];