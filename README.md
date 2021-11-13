# EmbeddedStatusWidget
This project aims to allow [Instatus](https://instatus.com) users to add embeddable javascript widget that pops up on their homepage when there’s a current incident or a scheduled maintenance.

## Requirements and Installation Guide

### Requirements
- Bootstrap 5

### Install Bootstrap 5
There are two ways to install Bootstrap 5:
- Install Bootstrap 5 you can find it here [Bootstrap 5](https://getbootstrap.com) and include it in your html file
- The other choice is to add the following line to your html file and that is the option used in this project
	```html 
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	```

## How to use the Widget

### Link Bootstrap 5 in html file
- The first step is to link bootstrap 5 in the html page as explained earlier

### Include the alerts div in html file
- Add the following line in your html file this is the div where all of our alerts will show up so add it in the place you find best for your website design
	```html
	<div id="liveAlertPlaceholder"></div>
	```

### Include the widget.js in html file
- Add the following line in your html page
	```html
	<script src="widget.js"></script>
	```

### Link your status page to widget.js
- Make sure to replace the URL in [widget.js line 9](https://github.com/ThePinger/EmbeddedStatusWidget/blob/755e6987178f7a8beffae2ea08cda8f91a65bfdb/widget.js#L9) with the URL of your own Instatus issues.json file
	```javascript
	loadJSON('YOUR_INSTATUS_STATUS_PAGE_URL/issues.json', showAlerts, handleError);
	```
**Now you are good to GO** :rocket:

![Screen Shot 2021-11-13 at 11 19 37 PM](https://user-images.githubusercontent.com/24881768/141659379-086b951a-128b-4cbe-8b15-734acedb620b.png)


## Customize your Widget :rainbow:
If you wish to customize your widget, alerts colors or even some of the status colors

### Customizing Incident Status Font Colors
- You can change it from these lines [widget.js line 58 --> 67](https://github.com/ThePinger/EmbeddedStatusWidget/blob/755e6987178f7a8beffae2ea08cda8f91a65bfdb/widget.js#L58-L67)
- For every status you can simply change the font color like the following
	```javascript
    status = '<p style="color:ADD_THE_COLOR_YOU_WANT; float:right"> Investigating</p>';
	```

![Screen Shot 2021-11-13 at 11 19 37 PM copy](https://user-images.githubusercontent.com/24881768/141659684-0a89bdba-138b-4278-891f-b3d56a366c7a.png)

### Customizing Incident Impact Font Color
- You can change it from these lines [widget.js line 70 --> 83](https://github.com/ThePinger/EmbeddedStatusWidget/blob/755e6987178f7a8beffae2ea08cda8f91a65bfdb/widget.js#L70-L83)
- For every impact you can simply change the font color like the following
	```javascript
    impact += '<p style="display:inline; color:ADD_THE_COLOR_YOU_WANT"> Operational</p>';
	```
![Screen Shot 2021-11-13 at 11 19 37 PM copy 2](https://user-images.githubusercontent.com/24881768/141659789-97f2bd2a-227c-4a02-beb4-922b6abad4e2.png)

### Customizing Incident Alert Color
By default the Incidents alert are yellow however if you wish to customize them proceed with the following steps

- You can change it from this line [widget.js line 86](https://github.com/ThePinger/EmbeddedStatusWidget/blob/755e6987178f7a8beffae2ea08cda8f91a65bfdb/widget.js#L86)
- To change the incident alert color choose one of the available [Bootstrap options](https://getbootstrap.com/docs/5.1/components/alerts/#examples) 
	- primary
	- secondary
	- success
	- danger
	- warning
	- info
	- light
	- dark
	```javascript
    wrapper.innerHTML = '<div id="div' + id + '" class="alert alert-ADD_YOUR_PREFFERED_ALERT_LOOK alert-dismissible" role="alert">' + '<h4 style="float:left">' + name + '</h4>' + status + '<br><br>' + impact + '<h6 >Started ' + started + '</h6>' + '<button id="' + id + '" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
	```
	
### Customizing Maintenance Status Font Color
- You can change it from these lines [widget.js line 139 --> 146](https://github.com/ThePinger/EmbeddedStatusWidget/blob/755e6987178f7a8beffae2ea08cda8f91a65bfdb/widget.js#L139-L146)
- For every status you can simply change the font color like the following
	```javascript
    status = '<p style="color:ADD_THE_COLOR_YOU_WANT; float:right"> Not Started Yet</p>';
	```
	
### Customizing Maintenance Alert Color
By default the Maintenance alert are blue however if you wish to customize them proceed with the following steps

- You can change it from this line [widget.js line 149](https://github.com/ThePinger/EmbeddedStatusWidget/blob/755e6987178f7a8beffae2ea08cda8f91a65bfdb/widget.js#149)
- To change the maintenance alert color choose one of the available [Bootstrap options](https://getbootstrap.com/docs/5.1/components/alerts/#examples) 
	- primary
	- secondary
	- success
	- danger
	- warning
	- info
	- light
	- dark
	```javascript
    wrapper.innerHTML = '<div id="div' + id + '" class="alert alert-ADD_YOUR_PREFFERED_ALERT_LOOK alert-dismissible" role="alert">' + '<h4 style="float:left">' + name + '</h4>' + status + '<br><br>' + '<h6 >From ' + start + ' to ' + end +  '</h6>' + '<button id="' + id + '" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
	```
