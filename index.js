/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Physics Lerp component for A-Frame.
 */
AFRAME.registerComponent('physics-lerp', {
  schema: {
    targetPosition: {type: 'vec3'},
    targetQuaternion: {type: 'vec4'},
    targetVelocity: {type: 'vec3'},
    targetAngularVelocity: {type: 'vec3'},
    time: {
      type: 'int',
      default: 100
    }
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    this.physicsInterpolationTarget = {
      position: new CANNON.Vec3(this.data.targetPosition.x, this.data.targetPosition.y, this.data.targetPosition.z),
      quaternion: new THREE.Quaternion(this.data.targetQuaternion.x, this.data.targetQuaternion.y, this.data.targetQuaternion.z, this.data.targetQuaternion.w),
      velocity: new CANNON.Vec3(this.data.targetVelocity.x, this.data.targetVelocity.y, this.data.targetVelocity.z),
      angularVelocity: new CANNON.Vec3(this.data.targetAngularVelocity.x, this.data.targetAngularVelocity.y, this.data.targetAngularVelocity.z)
    };

    this.interpolationStartTime = Date.now();
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  tick: function (t) {
    var body = this.getMyBody();
    if (body) {
      var time = Date.now();
      var progress = 0;

      if (time > (this.interpolationStartTime + this.data.time)) {
        progress = 1;
      } else {
        progress = (time - this.interpolationStartTime) / this.data.time;
      }

      body.position.lerp(this.physicsInterpolationTarget.position, progress, body.position);
      var tempQuaternion = new THREE.Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
      body.quaternion.copy(tempQuaternion.slerp(this.physicsInterpolationTarget.quaternion, progress));
      body.velocity.lerp(this.physicsInterpolationTarget.velocity, progress, body.velocity);
      body.angularVelocity.lerp(this.physicsInterpolationTarget.angularVelocity, progress, body.angularVelocity);
    }
  },

  getMyBody: function() {
    // This is necessary because of networked-aframes schema system
    if (this.el.body) {
      return this.el.body;
    } else {
      var childBody = this.el.querySelector("[dynamic-body], [static-body]");

      if (childBody && childBody.body) {
        return childBody.body;
      }
    }

    return null;
  },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});
