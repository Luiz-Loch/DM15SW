# DM15SW CCH

> Luiz Gabriel Canton Loch
>
> 1976419

Aplicativo para dispositivo móvel feito com React Native para disciplina DM15SW.

## Iniciar o aplicativo

Para iniciar o aplicativo, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Luiz-Loch/DM15SW.git
   cd DM15SW
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o aplicativo:**
   ```bash
   npx expo start --clear
   ```

## Estrutura do Projeto

```
.
├── app
│   ├── (auth)
│   └── (tabs)
│       └── plants
└── scr
    ├── assets
    │   ├── fonts
    │   └── images
    ├── components
    ├── constants
    ├── contexts
    ├── hooks
    ├── services
    └── utils
```
### Descrição da Estrutura

- **app/**: Contém as rotas e telas principais do aplicativo.
   - **(auth)/**: Telas e fluxos relacionados à autenticação de usuários.
   - **(tabs)/**: Telas acessíveis via navegação por abas.

- **scr/**: Código-fonte principal da aplicação.
   - **assets/**: Recursos estáticos.
      - **fonts/**: Arquivos de fontes personalizadas.
      - **images/**: Imagens utilizadas no app.
   - **constants/**: Definições de constantes globais (cores, temas, etc).
   - **contexts/**: Contextos React para gerenciamento de estado global.
   - **hooks/**: Hooks customizados para reutilização de lógica.
   - **utils/**: Funções utilitárias e helpers.
