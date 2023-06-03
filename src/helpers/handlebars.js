/* This code is defining a helper function called `timeago` that uses the `format` function from the
`timeago.js` library to format a timestamp into a human-readable string representing the time
elapsed since that timestamp. The `helpers` object is then exported as a module to be used in other
parts of the codebase. */
import { format} from 'timeago.js';

const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp); 
}

export default helpers;