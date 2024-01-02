# atlassian-scriptable-widget
Boost productivity with this scriptable widget. Seamlessly integrating JIRA and Bitbucket insights into your iOS device, this dynamic tool empowers users to query metrics effortlessly. Get updates on open JIRA tickets, pending pull requests, and your own open pull requests with a quick glance.


# Atlassian Scriptable Widget

![Atlassian Widget Preview](https://github.com/Korysam15/atlassian-scriptable-widget/blob/main/docs/img/widget.png)

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

**Atlassian Scriptable Widget** is a JavaScript-based widget for the [Scriptable](https://scriptable.app/) app that provides a convenient way to get updates on open JIRA tickets, pending pull requests and open pull requests from either your iOS or macOS device's home screen.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- [Scriptable App](https://scriptable.app/) installed on your iOS or macOS device.

## Installation

1. Clone or download the repository:

    ```bash
    git clone https://github.com/Korysam15/atlassian-scriptable-widget.git
    ```

2. Open the Scriptable app.

3. Create a new script by tapping the "+" icon and paste the contents of `atlassian-widget.js` into the script editor.

4. Save the script and exit the Scriptable app.

5. Add a Scriptable widget to your iOS or macOS home screen.

6. Edit the widget, and choose the "Atlassian Widget" script you just created.

7. Resize the widget according to your preferences.

8. Enjoy real-time Atlassian metrics status updates on your home screen!

## Usage

The Atlassian Scriptable Widget will automatically fetch and display the status of your JIRA and Bitbucket metrics. Tap the widget to open the Scriptable app for more details.

## Configuration

Customize the widget by modifying the configuration options within the script. Edit the `config` object to set your Bamboo server URL, API key, and specific build plans to monitor.

```javascript
const config = {
  jiraUrl: 'https://your-jira-server.com:8080/rest/api/2/search?jql=assignee=',
  bitbucketUrl: 'https://your-bitbucket-server.com:7990/rest/api/latest',
  username: 'your-username',
  jiraAPIKey: 'your-jira-api-key',
  bitbucketAPIKey: 'your-bitbucket-api-key'
};
```

## Contributing
Feel free to contribute to the project by opening issues or submitting pull requests. Follow the contribution guidelines for details.

## License
This project is licensed under the MIT [License.](https://github.com/Korysam15/atlassian-scriptable-widget/blob/main/LICENSE)

## Acknowledgements
This project draws inspiration from the innovative work done by the creators of [gitlab-stats-for-scriptable.](https://github.com/p0fi/gitlab-stats-for-scribtable/tree/main)