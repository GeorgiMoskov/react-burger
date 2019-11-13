import React, { PureComponent } from 'react'
import Input from '../Input/Input';
import { Map } from 'immutable';

import { checkValidity } from '../../../shared/utility';

export default class FormBuilder extends PureComponent {
  
  componentDidMount() {
    this.setState(this.initState());
  }

  initState = () => {
    const initState = {};
    this.props.config.entrySeq().forEach(([controlType, controlConfig]) => {
      initState[controlType] = Map({
        value: controlConfig.get('value'),
        valid: controlConfig.get('valid'),
        touched: controlConfig.get('touched')
      });
    })
    return initState;
  }

  componentDidUpdate() {
    const controlTypeValue = {};
    Object.keys({...this.state}).forEach(controlType => {
        controlTypeValue[controlType] = this.state[controlType].get('value')
    })
    this.props.onFormUpdate(controlTypeValue, this.isValidForm());
  }

  isValidForm = () => {
    return !Object.keys({...this.state}).find(controlType => {
      return !this.state[controlType].get('valid');
    });
  }

  inputChangedHandler = (event, controlType) => {
    event.persist();
    this.setState(prevState => {
      return {
        [controlType]: prevState[controlType].mergeDeep({
          value: event.target.value,
          valid: checkValidity(event.target.value, this.props.config.getIn([controlType, 'validation'])),
          touched: true
        })
      }
    });
  }

  renderInputs = () => {
    if(!this.state || !this.props.config) {
      return null;
    }

    return this.props.config
      .map((controlConfig, controlType) => {
        return (
            <Input
              key={controlType}
              elementType={controlConfig.get('elementType')}
              elementConfig={controlConfig.get('elementConfig')}
              value={this.state[controlType].get('value')}
              isValid={this.state[controlType].get('valid')}
              isTouched={this.state[controlType].get('touched')}
              onChange={(event)=>{this.inputChangedHandler(event, controlType)}}/>
        );
      })
      .toList();  
  }

  render() {
    return (
      <div>
        {this.renderInputs()} 
      </div>
    )
  }
}
