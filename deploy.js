const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const path = require("path");

const config = {
  user: "if0_38762325", // ton utilisateur FTP
  password: "Bx03CgrcQ0", // ton mot de passe FTP
  host: "ftpupload.net", // InfinityFree FTP host
  port: 21,
  localRoot: path.join(__dirname, "build"),
  remoteRoot: "/htdocs/", // ou un sous-dossier, si tu veux
  include: ["*", "**/*"],
  deleteRemote: true, // efface les anciens fichiers avant d’envoyer les nouveaux
  forcePasv: true,
};

ftpDeploy
  .deploy(config)
  .then(res => console.log("✅ Déploiement terminé !"))
  .catch(err => console.error("❌ Erreur FTP :", err));
