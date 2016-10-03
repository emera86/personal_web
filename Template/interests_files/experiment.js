define(['lodash'], function (_) {
    'use strict';

    if (typeof window !== 'object') {
        return {
            isOpen: _.constant(false)
        };
    }

    var rawRunningExperiments = getRunningExperiments();
    var transformedRunningExperiments = transformRunningExperiments(rawRunningExperiments);

    function isOpen(name) {
        if (rawRunningExperiments !== getRunningExperiments()) {
            rawRunningExperiments = getRunningExperiments();
            transformedRunningExperiments = transformRunningExperiments(getRunningExperiments());
        }

        return transformedRunningExperiments[name.toLowerCase()] === 'new';
    }

    function getRunningExperiments() {
        return (window.rendererModel || window.editorModel || {}).runningExperiments;
    }

    function transformRunningExperiments(runningExperiments) {
        return _.mapKeys(runningExperiments, function (value, key) {
            return key.toLowerCase();
        });
    }

    return {
        isOpen: isOpen
    };
});
