import { Model as AddressMixin, defineProjections } from
  '../mixins/regenerated/models/i-i-s-flexberry-gis-test-stand-address';
import { Projection } from 'ember-flexberry-data';
import { Offline } from 'ember-flexberry-data';
let Model = Projection.Model.extend(Offline.ModelMixin, AddressMixin, {

});
defineProjections(Model);
export default Model;
