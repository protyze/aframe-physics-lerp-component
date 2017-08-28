## aframe-physics-lerp-component

A Physics Lerp component for [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| targetPosition         | A THREE.Vector3 object representing the target position            | 0, 0, 0              |
| targetQuaternion         | A THREE.Quaternion object representing the target quaternion            | 0, 0, 0, 0              |
| targetVelocity         | A THREE.Vector3 object representing the target velocity            | 0, 0, 0              |
| targetAngularVelocity         | A THREE.Vector3 object representing the target angularVelocity            | 0, 0, 0              |
| time         | Time to complete the interpolation in milliseconds            | 100              |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
  <script src="//cdn.rawgit.com/donmccurdy/aframe-physics-system/v2.0.0/dist/aframe-physics-system.min.js"></script>
  <script src="https://rawgit.com/protyze/aframe-physics-lerp-component/master/dist/aframe-physics-lerp-component.min.js"></script>
</head>

<body>
   <a-scene physics="debug:true">
        <a-assets></a-assets>
        <a-box id="box1" dynamic-body material="color: #ff0000"></a-box>
        <a-box id="box2" dynamic-body material="color: #0000ff" physics-lerp="...Properties..."></a-box>
   </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-physics-lerp-component
```

Then register and use.

```js
require('aframe');
require('aframe-physics-lerp-component');
```
