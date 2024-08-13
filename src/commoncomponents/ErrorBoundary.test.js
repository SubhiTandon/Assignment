import React from "react";
import { render , screen} from '@testing-library/react';
import ErrorBoundary from "./ErrorHandler";
import ErrorProneComponent from './ErrorProneComponent'

describe('Errorboundary' , () => {
    it('should display the fallback UI when a child component throws an error' , () => {
        render (
            <ErrorBoundary>
                <ErrorProneComponent />
            </ErrorBoundary>
        );

     
    })
})

