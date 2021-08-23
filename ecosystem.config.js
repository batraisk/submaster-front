module.exports = {
  apps: [{
    name: "submaster-front",
    script: "app.js"
  }],
  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      key: "~/.ssh/id_rsa",
      // SSH user
      user: "deploy",
      // SSH host
      host: ["3.138.156.115"],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      ssh_options: "StrictHostKeyChecking=no",
      // GIT remote/branch
      ref: "origin/master",
      // GIT remote
      repo: "ssh://git@github.com:batraisk/submaster-front.git",
      // path in the server
      path: "/home/deploy/submaster-front",
      // Pre-setup command or path to a script on your local machine
      // 'pre-setup': "apt-get install git ; ls -la",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      // 'post-setup': "ls -la",
      // pre-deploy action
      // 'pre-deploy-local': "echo 'This is a local executed command'",
      // post-deploy action
      'post-deploy': "npm i; ng build --prod",
    },
  }
}
