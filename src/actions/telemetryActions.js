import * as types from './actionTypes';
import { loadFailed } from './ajaxStatusActions';
import ApiService from '../common/apiService';

export const loadTelemetryTypesSuccess = data => {
  return {
    type: types.LOAD_TELEMETRY_TYPES_SUCCESS,
    data
  };
};

export const updateTelemetrMessagesSuccess = data => {
  return {
    type: types.UPDATE_TELEMETRY_TYPES_SUCCESS,
    data
  };
};

export const loadTelemetrMessagesSuccess = data => {
  return {
    type: types.LOAD_TELEMETRY_MESSAGES_SUCCESS,
    data
  };
};

export const selectTelemetryType = key => {
  return {
    type: types.SELECT_TELEMETRY_TYPE,
    key
  };
};

export const loadTelemetryTypes = () => {
  return dispatch => {
    return ApiService.getTelemetryMessages()
      .then(data => {
        dispatch(loadTelemetryTypesSuccess(data.Properties));
      })
      .catch(error => {
        dispatch(loadFailed(error));
        throw error;
      });
  };
};

//for all telemetry messages
export const loadTelemetryMessages = deviceList => {
  return dispatch => {
    return ApiService.loadTelemetryMessages(deviceList)
      .then(data => {
        dispatch(loadTelemetrMessagesSuccess(data));
      })
      .catch(error => {
        dispatch(loadFailed(error));
        throw error;
      });
  };
};

// telemetryMessages based on the deviceId's
export const loadTelemetryMessagesByDeviceIds = deviceList => {
  return dispatch => {
    return ApiService.loadTelemetryMessages(deviceList)
      .then(data => {
        // TODO: using the same action ??
        dispatch(loadTelemetrMessagesSuccess(data));
      })
      .catch(error => {
        dispatch(loadFailed(error));
        throw error;
      });
  };
};

// telemetryMessages for last 1 minute
export const loadTelemetryMessagesP1M = deviceList => {
  return dispatch => {
    return ApiService.getTelemetryMessagesP1M(deviceList)
      .then(data => {
        dispatch(updateTelemetrMessagesSuccess(data));
      })
      .catch(error => {
        dispatch(loadFailed(error));
        throw error;
      });
  };
};
