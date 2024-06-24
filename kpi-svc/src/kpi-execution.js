"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeAggregations = computeAggregations;
exports.computeConditioning = computeConditioning;
function computeAggregations(kpi) {
    return {
        median: calculateMedian(kpi),
        average: calculateAverage(kpi),
        integration: calculateIntegration(kpi),
        sum: calculateSum(kpi),
    };
}
function calculateMedian(kpi) {
    // Implement your logic here
    return 0;
}
function calculateAverage(kpi) {
    // Implement your logic here
    return 0;
}
function calculateIntegration(kpi) {
    // Implement your logic here
    return 0;
}
function calculateSum(kpi) {
    // Implement your logic here
    return 0;
}
function computeConditioning(kpi) {
    // Implement your logic here
    return 0;
}
