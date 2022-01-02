import { App } from "../App";
import { MutateResult } from "../links/synchronouslinks/GraphQLLink";
import { DefaultControllerRequired } from "./Controller";

export enum ShiftTimePeriodType {
    WORK = "WORK",
    BREAK = "BREAK",
}

export interface ShiftTimePeriodInput {
    employee_id: string;
    type: ShiftTimePeriodType;
}

export interface ShiftTimePeriod extends DefaultControllerRequired {
    shift: Shift;
    start_time: string;
    end_time: string;
    type: ShiftTimePeriodType;
}

export interface Shift extends DefaultControllerRequired {
    employee_id: string;
    start_time: string;
    end_time: string;
    shift_time_periods: Array<ShiftTimePeriod>;
}

/**
 * Controller for shifts.
 */
export class ShiftController {
    app: App;
    constructor(app: App) {
        this.app = app;
        this.startShift = this.startShift.bind(this);
        this.endShift = this.endShift.bind(this);
        this.updateShiftTimePeriod = this.updateShiftTimePeriod.bind(this);
    }

    /**
     * Start a new shift for the employee and return the created shift if sucessful.
     * @param {string} employee_id - The id of Employee starting the Shift
     * @returns {Promise<Shift>} - The newly started Shift
     */
    startShift(employee_id: string): Promise<Shift>{
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation($employee_Id: ObjectID!) {
                    startShift(employee_id: $employee_id) {
                        _id
                        employee_id
                        start_time
                        end_time
                        shift_time_periods {
                            _id
                            shift {
                                _id
                            }
                            start_time
                            end_time
                            type
                        }   
                    }
                }
            `;
            this.app
                .getAdaptor()
                .mutate(mutationString, {
                    employee_id
                })
                .then((result: MutateResult) => {
                    resolve(result.startShift);
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }

    /**
     * End the active shift for the employee and return the ended shift if sucessful.
     * @param {string} employee_id - The id of Employee end the Shift
     * @returns {Promise<Shift>} - The ended Shift
     */
    endShift(employee_id: string): Promise<Shift>{
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation($employee_Id: ObjectID!) {
                    endShift(employee_id: $employee_id) {
                        _id
                        employee_id
                        start_time
                        end_time
                        shift_time_periods {
                            _id
                            shift {
                                _id
                            }
                            start_time
                            end_time
                            type
                        }   
                    }
                }
            `;
            this.app
                .getAdaptor()
                .mutate(mutationString, {
                    employee_id
                })
                .then((result: MutateResult) => {
                    resolve(result.endShift);
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }

    /**
     * Update the active shift time period for the employee and return the newly created shift time period if successful.
     * @param {ShiftTimePeriodInput} shiftTimePeriod - The ShiftTimePeriod Object
     * @returns {Promise<ShiftTimePeriod>} - The newly made ShiftTimePeriod
     */
    updateShiftTimePeriod(shiftTimePeriod: ShiftTimePeriodInput): Promise<ShiftTimePeriod> {
        return new Promise((resolve, reject) => {
            let mutationString = `
                mutation($shift_time_period: ShiftTimePeriodInput!) {
                    updateShiftTimePeriod(shift_time_period: $shift_time_period) {
                        _id
                        shift {
                            _id
                            start_time
                        }
                        start_time
                        end_time
                        type
                    }
                }
            `;
            this.app
                .getAdaptor()
                .mutate(mutationString, {
                    shiftTimePeriod
                })
                .then((result: MutateResult) => {
                    resolve(result.updateShiftTimePeriod);
                })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }
}