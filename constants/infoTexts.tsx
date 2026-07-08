import { ReactNode } from "react";

export type InfoProps = {
  id: string;
  title: ReactNode;
  text: string;
};

export const INFO_TEXTS: InfoProps[] = [
  {
    id: "despertar",
    title: (
      <>
        O primeiro <span>gole</span> muda tudo
      </>
    ),
    text: "Não é só cafeína. É um estalo elétrico que acorda cada célula do seu corpo e avisa: hoje não tem freio. Feito pra quem trata o cansaço como sugestão, não como destino.",
  },
  {
    id: "foco",
    title: <>Clareza não se pede, se <span>conquista</span></>,
    text: "Enquanto o mundo roda em câmera lenta, você já está três jogadas à frente. Nossa fórmula foi pensada pra afiar o raciocínio e cortar o ruído — só sobra o que importa.",
  },
  {
    id: "limite",
    title: <>O <span>limite</span> é só o ponto de <span>partida</span></>,
    text: "Toda energia que você sente vindo de dentro, na verdade, veio de uma lata. E tá tudo bem: às vezes a fagulha certa é tudo que separa 'quase' de 'consegui'.",
  },
];
