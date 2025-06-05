# 📧 Configuration EmailJS pour le Formulaire de Contact

## 🎯 Objectif
Recevoir les messages du formulaire de contact directement dans votre boîte mail **smfbordeaux@gmail.com**.

## 📋 Étapes de Configuration

### 1. Créer un Compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur "Sign Up" et créez un compte gratuit
3. Confirmez votre email

### 2. Configurer le Service Email
1. Dans votre tableau de bord EmailJS, cliquez sur "Email Services"
2. Cliquez sur "Add New Service"
3. Sélectionnez "Gmail" 
4. Connectez votre compte Gmail **smfbordeaux@gmail.com**
5. Notez le **Service ID** qui sera généré (ex: `service_xyz123`)

### 3. Créer un Template Email
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce modèle de template :

```
Sujet: Nouvelle demande de contact - Site SMF Bordeaux

Corps du message:
==============================================
NOUVELLE DEMANDE DE CONTACT SMF BORDEAUX
==============================================

👤 Nom : {{from_name}}
📧 Email : {{from_email}}
📱 Téléphone : {{phone}}
🎯 Tranche d'âge : {{age_group}}

💬 Message :
{{message}}

==============================================
Envoyé depuis le site web SMF Bordeaux
Répondre à : {{reply_to}}
==============================================
```

4. Notez le **Template ID** généré (ex: `template_abc456`)

### 4. Récupérer la Clé Publique
1. Allez dans "Account" > "General"
2. Copiez votre **Public Key** (ex: `pk_123xyz789`)

### 5. Mettre à Jour le Code
Dans le fichier `script.js`, remplacez les valeurs suivantes :

```javascript
// Ligne 23 - Remplacez YOUR_PUBLIC_KEY
publicKey: "votre_public_key_ici",

// Ligne 44 - Remplacez YOUR_SERVICE_ID et YOUR_TEMPLATE_ID
emailjs.send('votre_service_id', 'votre_template_id', templateParams)
```

### 6. Exemple de Configuration Finale
```javascript
// Configuration EmailJS
(function() {
    emailjs.init({
        publicKey: "pk_123xyz789", // Votre vraie clé
    });
})();

// Dans la fonction d'envoi :
emailjs.send('service_xyz123', 'template_abc456', templateParams)
```

## 🧪 Test du Système

### Tester le Formulaire
1. Ouvrez votre site web
2. Remplissez le formulaire de contact
3. Cliquez sur "Envoyer ma demande"
4. Vérifiez votre boîte mail **smfbordeaux@gmail.com**

### Messages que Vous Recevrez
Chaque soumission du formulaire vous enverra un email avec :
- ✅ Nom du visiteur
- ✅ Email du visiteur
- ✅ Numéro de téléphone
- ✅ Tranche d'âge sélectionnée
- ✅ Message personnalisé
- ✅ Possibilité de répondre directement

## 🔒 Sécurité
- EmailJS est entièrement sécurisé
- Vos clés sont publiques mais limitées à votre domaine
- Gratuit jusqu'à 200 emails/mois
- Aucun serveur backend nécessaire

## 🆘 Support
Si vous avez des problèmes :
1. Vérifiez que tous les IDs sont corrects
2. Consultez la console du navigateur pour les erreurs
3. Testez d'abord avec un email personnel

## 📈 Quota Gratuit EmailJS
- ✅ 200 emails/mois
- ✅ 2 services email
- ✅ Templates illimités
- ✅ Support technique

Parfait pour un site scout local ! 🏕️ 