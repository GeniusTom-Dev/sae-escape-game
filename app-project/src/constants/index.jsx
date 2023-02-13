export const commands = [
    {
        command: "help",
        returnText: 
        <div>
            <h1>Voici la liste des commandes disponibles :</h1>
            <p className="ml-4"><code className='text-red-700'>help</code> - List des commandes</p>
            <p className="ml-4"><code className='text-red-700'>man</code> - Voir le manuel d'une commande</p>
            <p className="ml-4"><code className='text-red-700'>cd</code> - changer de fichier</p>
            <p className="ml-4"><code className='text-red-700'>ls</code> - Voir la liste des fichiers dans le répertoire présent</p>
            <p className="ml-4"><code className='text-red-700'>chmod</code> - Modifier les permissions d'un fichier/dossier</p>
            <p className="ml-4"><code className='text-red-700'>cat</code> - Afficher le contenu d'un fichier</p>
            <p className="ml-4"><code className='text-red-700'>./</code> - Lancer un fichier .sh</p>
            <p className="ml-4"><code className='text-red-700'>cesar</code> - Décrypte un message coder</p>
            <p className="ml-4"><code className='text-red-700'>steghide</code> - Extraire un fichier caché dans une image</p>
            <p className="ml-4"><code className='text-red-700'>useradd</code> - Crée un utilisateur</p>
        </div>

    },
    
    {
        command: "chmod 777 instructions.txt",
        returnText: 
        <div>
            <p>Fichier Dévérouiller</p>
        </div>

    },

    {
        command: "ls",
        returnText: 
        <div className="flex">
            <p>Documents</p>
            <p className="ml-4">Images</p>
            <p className="ml-4">Musique</p>
            <p className="ml-4">Téléchargements</p>
            <p className="ml-4">Vidéo</p>
        </div>

    },

    {
        command: "man",
        returnText: 
        <div>
            <p>Args command not found</p>
        </div>

    },

    {
        command: "man cd",
        returnText: 
        <div>
            <h1>Name</h1>
            <p className="ml-4">cd - change directory</p>

            <h1 className="mt-4">SYNOPSIS</h1>
            <p className="ml-4">cd FolderName</p>

        </div>

    },

    {
        command: "man ls",
        returnText: 
        <div>
            <h1>Name</h1>
            <p className="ml-4">ls - List File and Directory</p>

            <h1 className="mt-4">SYNOPSIS</h1>
            <p className="ml-4">ls</p>

            <h1 className="mt-4">DESCRIPTION</h1>
            <p className="ml-4">Optional Args :</p>
            <p className="ml-4 mt-2">-a   see all files including hidden</p>

        </div>

    },
    {
        command: "man chmod",
        returnText: 
        <div>
            <h1>Name</h1>
            <p className="ml-4">chmod - change the access permissions of files and directories</p>

            <h1 className="mt-4">SYNOPSIS</h1>
            <p className="ml-4">chmod permissions filename</p>

            <h1 className="mt-4">DESCRIPTION</h1>
            <p className="ml-4 mt-2">Permissions :</p>
            <p className="ml-4">777   All access on file</p>

        </div>

    },

    {
        command: "man cat",
        returnText: 
        <div>
            <h1>Name</h1>
            <p className="ml-4">cat - Print the content of a file</p>

            <h1 className="mt-4">SYNOPSIS</h1>
            <p className="ml-4">cat namefile</p>

            

        </div>

    },

    {
        command: "man cesar",
        returnText: 
        <div>
            <h1>Name</h1>
            <p className="ml-4">cesar - decrypt file with cesar algorithm</p>

            <h1 className="mt-4">SYNOPSIS</h1>
            <p className="ml-4">cesar filename</p>

        </div>

    },

    {
        command: "man steghide",
        returnText: 
        <div>
            <h1>Name</h1>
            <p className="ml-4">steghide - Extract file from image</p>

            <h1 className="mt-4">SYNOPSIS</h1>
            <p className="ml-4">steghide extract -sf Name_File_To_Extract -xf Name_Out_File -p</p>

            <h1 className="mt-4">Exemple</h1>
            <p className="ml-4">steghide extract -sf image.png -xf file.txt -p</p>

        </div>

    },

    {
        command: "man useradd",
        returnText: 
        <div>
            <h1>Name</h1>
            <p className="ml-4">useradd - create new user</p>

            <h1 className="mt-4">SYNOPSIS</h1>
            <p className="ml-4">useradd username</p>

        </div>

    },

    {
        command: "man ./",
        returnText: 
        <div>
            <h1>Name</h1>
            <p className="ml-4">./ - Start script</p>

            <h1 className="mt-4">SYNOPSIS</h1>
            <p className="ml-4">./namefile.sh</p>

        </div>

    },
]

export const questions = [
    {
        question: "Qui est le créateur de linux ?",
        anwser: [
            "Linus Torvalds",
            "James Gosling",
            "Bill Gates",
            "Steve Jobs"
        ],
        correctAnwser: "Linus Torvalds"
    },

    {
        question: "Quand est paru Linux ?",
        anwser: [
            "1991",
            "1995",
            "1985",
            "1999"
        ],
        correctAnwser: "1991"
    },

    {
        question: "Quelle commande permet de modifier les permissions d'un Fichier / Dossier ?",
        anwser: [
            "chmod",
            "cd",
            "ls",
            "cesar"
        ],
        correctAnwser: "chmod"
    },

    {
        question: "Sur quelle distribution de linux somme nous ?",
        anwser: [
            "Ubuntu",
            "Kali",
            "Debian",
            "RedHat"
        ],
        correctAnwser: "Ubuntu"
    },

    {
        question: "Quel est le logo de Linux ?",
        anwser: [
            "Un Pingouin",
            "Une Pomme",
            "Quatres Carrés",
            "Un Robot"
        ],
        correctAnwser: "Un Pingouin"
    },
]

export const linuxWiki = [
    <div><b>Linux</b> ou <b>GNU/Linux</b> est une famille de <span className="text-[#466cd1]">systèmes d'exploitation open source de type Unix </span>
     fondé sur le <span className="text-[#466cd1]">noyau Linux</span>, créé en <span className="text-[#466cd1]">1991</span> par <span className="text-[#466cd1]">Linus Torvalds</span>. De nombreuses 
      <span className="text-[#466cd1]"> distributions Linux</span> ont depuis vu le jour et constituent un important vecteur de popularisation du
      mouvement du <span className="text-[#466cd1]">logiciel libre</span>. Si à l'origine, Linux a été développé pour les <span className="text-[#466cd1]">ordinateurs
      compatibles PC</span>, il n'a jamais équipé qu'une très faible part des <span className="text-[#466cd1]">ordinateurs
      personnels</span>. Mais le noyau Linux, accompagné ou non des <span className="text-[#466cd1]">logiciels GNU</span>, est également
      utilisé par d'autres types de systèmes informatiques, notamment les <span className="text-[#466cd1]">serveurs,
      téléphones portables, systèmes embarqués</span> ou encore <span className="text-[#466cd1]">superordinateurs</span>. Le système
      d'exploitation pour téléphones portables <span className="text-[#466cd1]">Android</span> qui utilise le noyau Linux mais pas
      <span className="text-[#466cd1]"> GNU</span>, équipe aujourd'hui 85 % des <span className="text-[#466cd1]">tablettes tactiles</span> et <span className="text-[#466cd1]">smartphones</span>.</div>,

    <div>En <span className="text-[#466cd1]">1991</span>, l’étudiant <span className="text-[#466cd1]">finlandais Linus Torvalds</span>,
        indisposé par la faible disponibilité du <span className="text-[#466cd1]">serveur informatique UNIX</span>
        de <span className="text-[#466cd1]">l’université d'Helsinki</span>, entreprend le développement d’un <span className="text-[#466cd1]">noyau de système d'exploitation</span>
        , qui prendra le nom de « <span className="text-[#466cd1]">noyau Linux</span> ».

        <span className="text-[#466cd1]">Linus Torvalds</span> utilisait et appréciait Minix. Le <span className="text-[#466cd1]">25 août 1991</span>
        , il annonce sur le forum Usenet comp.os.minix
        le développement du noyau Linux5.
        
        <span className="text-[#466cd1]">Linus Torvalds</span> choisit rapidement de publier son noyau sous licence <span className="text-[#466cd1]">GNU GPL</span>.
        Cette décision rend compatibles juridiquement les systèmes <span className="text-[#466cd1]">GNU et Linux</span>. Dès lors, pour combler le vide causé par
         le développement inachevé de Hurd, GNU et le noyau Linux sont associés pour former un nouveau 
        système d'exploitation (parfois considéré comme variante de <span className="text-[#466cd1]">GNU</span>) : GNU/Linux ou Linux.
    </div>
]

export const rigthSide = [
    {
        name: <b>Famille</b>,
        desc: <span className="text-[#466cd1]">UNIX</span>
    },

    {
        name: <span className="text-[#466cd1]">Langues</span>,
        desc: <p className="text-black">Anglais pour le noyau, multilingue pour la plupart des <span className="text-[#466cd1]">distributions Linux</span></p>
    },

    {
        name: <p><b>Type de </b><span className="text-[#466cd1]">noyau</span></p>,
        desc: <span className="text-[#466cd1]">Linux</span>
    },

    {
        name: <b>État du projet</b>,
        desc: <p className="text-black">En développement constant</p>
    },

    {
        name: <b>Fondateur</b>,
        desc: <span className="text-[#466cd1]">Linus Torvalds</span>
    },

    {
        name: <b>Première version</b>,
        desc: <p className="text-black">17 septembre 1991</p>
    },
]