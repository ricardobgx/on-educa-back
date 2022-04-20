import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const uploads = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname.trim()}`;

      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Formatos de imagem aceitos
    const formatsAccepted = ['image/png', 'image/jpg', 'image/jpeg'];

    // Procura o formato do arquivo enviado para ver se eh aceito
    const isAccepted = formatsAccepted.find(
      (formatAccepted) => formatAccepted == file.mimetype
    );

    // Verifica se o formato foi aceito
    if (isAccepted) {
      // Executa a callback mandando true (validacao aceita)
      return cb(null, true);
    }

    // Executa a callback mandando false (validacao rejeitada)
    return cb(null, false);
  },
});

export const compressImage = async (
  file: Express.Multer.File,
  size: number
) => {
  // Pega o PATH antigo e altera a string que representa a extensao do arquivo
  const newPath = file.path.split('.')[0] + '.webp';

  // Usando o sharp para a compressao na imagem que o path aponta
  return sharp(file.path)
    .resize(size) // Redimensiona para o tamanho informado
    .toFormat('webp') // Forca a conversao do arquivo para o formato PNG
    .png({
      // Define uma qualidade para o arquivo comprimido
      quality: 80,
    })
    .toBuffer() // Transforma o arquivo em Buffer
    .then((data) => {
      // Processo para excluir o arquivo antigo
      // Verifica se o arquivo existe
      fs.access(file.path, (err) => {
        // Se nao houver erro quer dizer que o arquivo existe
        if (!err) {
          // Tenta apagar
          fs.unlink(file.path, (err) => {
            // Imprime o erro caso exista
            if (err) console.log(err);
          });
        }
      });

      // Armazenando o Buffer em um novo caminho
      fs.writeFile(newPath, data, (err) => {
        // Verifica se houve erro, se houver quer dizer que o upload falhou
        if (err) {
          throw err;
        }
      });

      console.log(newPath);

      // Retorna o novo path do arquivo
      return newPath;
    });
};

export const deleteImage = async (filename: string) => {
  const imagePath = path.join(__dirname, '..', '..', 'uploads', filename);

  // Verifica se o arquivo existe
  await fs.access(imagePath, (err) => {
    // Se nao houver erro quer dizer que o arquivo existe
    if (!err) {
      // Tenta apagar
      fs.unlink(imagePath, (err) => {
        // Imprime o erro caso nao consiga excluir
        if (err) console.log(err);
      });
    }
  });
};
