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
            <p className="ml-4"><code className='text-red-700'>cat</code> - Afficher le contenu d'une commande</p>
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
            <p className="ml-4">Image</p>
            <p className="ml-4">Musique</p>
            <p className="ml-4">Téléchargements</p>
            <p className="ml-4">Vidéo</p>
        </div>

    },

    {
        command: "cat instructions.txt",
        returnText: 
        <div>
            <p></p>
            <p className="ml-4">Image</p>
            <p className="ml-4">Musique</p>
            <p className="ml-4">Téléchargements</p>
            <p className="ml-4">Vidéo</p>
        </div>

    },
]