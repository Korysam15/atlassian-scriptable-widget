// Configuration
const config = {
  jiraUrl: 'https://your-jira-server.com:8080/rest/api/2/search?jql=assignee=',
  bitbucketUrl: 'https://your-bitbucket-server.com:7990/rest/api/latest',
  username: 'your-username',
  jiraAPIKey: 'your-jira-api-key',
  bitbucketAPIKey: 'your-bitbucket-api-key'
};

// Styling
const styling = {
  tintColor: new Color('#3C91E6'),
  textColor: new Color('#FFFFFF'),
  backgroundColor: new Color('#1A1B1E')
}

// Fetch Atlassian Data
async function fetchData() {
  let request = new Request(config.jiraUrl + config.username);
  request.headers = { "Authorization": `Bearer ${config.jiraAPIKey}` };
  let response = await request.loadJSON();

  const num_open_issues = response["issues"].length;
  let my_open_prs = 0;
  let prs_to_review = 0;

  request = new Request(config.bitbucketUrl + "/repos?limit=300");
  request.headers = { "Authorization": `Bearer ${config.bitbucketAPIKey}` };
  response = await request.loadJSON();

  for (entry of response["values"]) {
    let key = entry["project"]["key"];
    let slug = entry["slug"];

    request = new Request(config.bitbucketUrl + "/projects/" + key + "/repos/" + slug + "/pull-requests");
    request.headers = { "Authorization": `Bearer ${config.bitbucketAPIKey}` };
    response = await request.loadJSON();

    if (response["size"] > 0 && response["values"][0]["open"]) {
      if (response["values"][0]["author"]["user"]["name"] == config.username) {
        my_open_prs++;
      }
      for (reviewer of response["values"][0]["reviewers"]) {
        if (reviewer["user"]["name"] === config.username) {
          prs_to_review++;
          break;
        }
      }
    }
  }

  return {
    num_open_issues: num_open_issues,
    prs_to_review: prs_to_review,
    my_open_prs: my_open_prs
  };
}

// Get Image Data
async function getImage(name) {
  let data = '';
  switch (name) {
    case 'num_open_issues':
      return SFSymbol.named('app.badge.checkmark.fill');
    case 'prs_to_review_full':
      return SFSymbol.named("tray.full.fill");
    case 'prs_to_review_empty':
      return SFSymbol.named("tray");
    case 'my_open_prs':
      data = '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pCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hIqdEFpCNlRvePjpQaXUA6UmZ0/+hI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';
    break;
    case 'atlassian_logo':
      data = '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';
    break;
  default:
    data = '';
    break;
  }
  
  return Image.fromData(Data.fromBase64String(data));
}

// Create Widget
async function createWidget(size) {
  const widget = new ListWidget();
  widget.backgroundColor = styling.backgroundColor;

  const data = await fetchData();

  // images
  const num_open_issues_image = await getImage('num_open_issues');
  const prs_to_review_image = data.prs_to_review > 0 ? await getImage('prs_to_review_full') : await getImage('prs_to_review_empty');
  const my_open_prs_image = await getImage('my_open_prs');
  const atlassianImage = await getImage('atlassian_logo');

  const logo = widget.addImage(atlassianImage);
  logo.imageSize = new Size(80, 30);
  logo.centerAlignImage();

  // small size
  if (size === 'small') {
    widget.setPadding(10, 5, 15, 5);

    widget.addSpacer();

    const parentStack = widget.addStack();
    parentStack.layoutHorizontally();
    parentStack.addSpacer();

    let leftStack = parentStack.addStack();
    leftStack.layoutVertically();

    parentStack.addSpacer();

    let rightStack = parentStack.addStack();
    rightStack.layoutVertically();

    parentStack.addSpacer();

    // left stack
    addItem(num_open_issues_image.image, `${data.num_open_issues}`, leftStack, size);
    leftStack.addSpacer();
    
    addItem(prs_to_review_image.image, `${data.prs_to_review}`, leftStack, size);

    // right stack
    addItem(my_open_prs_image, `${data.my_open_prs}`, rightStack, size);
  }
  else if (size === "medium" || size === "large") {
    widget.addSpacer();

    let parentStack = widget.addStack();
    parentStack.layoutHorizontally();

    parentStack.addSpacer();

    addItem(num_open_issues_image.image, `${data.num_open_issues}`, parentStack, size, 'Open Issues');

    parentStack.addSpacer(30);

    addItem(prs_to_review_image.image, `${data.prs_to_review}`, parentStack, size, 'Review PRs');
      
    parentStack.addSpacer(30);

    addItem(my_open_prs_image, `${data.my_open_prs}`, parentStack, size, 'Open Prs');

    parentStack.addSpacer();

    widget.addSpacer();

  }
  else {
    const title = widget.addText(`size not supported`);
    title.font = Font.boldRoundedSystemFont(20);
    title.textColor = styling.textColor;
    title.centerAlignText();
  }

  return widget;
}

// Create Item
function addItem(img, count, stack, size, description="") {
  // small size
  if (size === 'small') {
    const line = stack.addStack();
    line.layoutVertically();

    const image = line.addImage(img);
    image.imageSize = new Size(20, 20);
    image.tintColor = styling.tintColor;

    line.addSpacer(3);
    const count = line.addText(count);
    count.font = Font.boldSystemFont(20);
    count.textColor = styling.textColor;
  }
  // medium/large size
  else if (size === 'medium' || size === "large") {
    const item = stack.addStack();
    item.layoutVertically();

    const image = item.addImage(img);
    image.imageSize = new Size(30, 30);
    image.tintColor = styling.tintColor;

    const description = item.addText(description);
    description.font = Font.thinRoundedSystemFont(13);
    description.textColor = styling.textColor;
    item.addSpacer(3);

    const count = item.addText(count);
    count.font = Font.boldSystemFont(25);
    count.textColor = styling.textColor;
  }
  else {
    console.error(`Size: ${size} not supported!`);
  }
}

// "Main Function"
if (config.runsInWidget) {
  const size = config.widgetFamily;
  const widget = await createWidget(size);

  Script.setWidget(widget);
} 
else {
  // choose any size for debugging
  const size = 'small';
  // const size = 'medium'
  // const size = 'large'
  
  const widget = await createWidget(size);
  if (size === 'small') {
    widget.presentSmall();
  } 
  else if (size === 'medium') {
    widget.presentMedium();
  } 
  else {
    widget.presentLarge();
  }
}

Script.complete();
