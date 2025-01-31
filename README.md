# Discord-React-Profile

Discord-React-Profile is a React project by Cyclone Addons that displays a customizable Discord profile card with real-time updates.

## Features

- Display user information such as username, avatar, and status.
- Real-time updates for user activity and presence.
- Customizable card design with easy styling.
- Responsive layout for different screen sizes.

## How to Use

1. **Installation**:
   - Clone the repository:
     ```bash
     git clone https://github.com/CycloneAddons/Discord-Realtime-Profile-Card.git
     ```
   - Navigate to the project directory:
     ```bash
     cd Discord-React-Profile
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

2. **Environment Setup**:
   - Create a `.env` file in the main directory and add the following:
     ```env
     BOTTOKEN= # Discord bot token
     ACCTOKEN= # Discord account token
     GUILDID= # Discord guild id
     INVITE= # Discord invite link of above guild
     WEBHOOK= # Discord webhook 
     SUPPORTROLE= # Discord Supporter role for Error related messsage to them
     ```

3. **Running the Project**:
   - Start the development server:
     ```bash
     npm start
     ```
   - Open your browser and navigate to `http://localhost:3000` to view the app.

4. **Customization**:
   - Open the `src` folder and edit the components to customize the profile card design and features.
   - Modify the `styles.css` file to change the styling.

## Contributions and Support

Feel free to open a pull request if you'd like to contribute to the project. If you encounter any errors or have questions, please open an issue on the GitHub repository.
