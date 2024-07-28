import { really_any } from './really_any';

/**
 * Just marks a place of place where should be something implemented
 * No side effects.
 *
 * Note: It can be usefull suppressing eslint errors of unused variables
 *
 * @param value any values
 * @returns void
 */
export function TODO_USE(...value: Array<really_any>): void {
    // Note: Do nothing
    value;
}

// TODO: !!!! Find ACRY all just(...) and replace with TODO_USE