import { expect } from 'chai';
import { describe, it } from 'mocha';
import ChatterError from '../../src/utils/ChatterError.js';

describe('ChatterError', () => {
  it('should be a class', () => {
    expect(ChatterError).to.be.a('function');
  });

  it('should have a constructor method', () => {
    expect(ChatterError.prototype.constructor).to.be.a('function');
  });

  it('should have a statusCode property', () => {
    const error = new ChatterError(404);
    expect(error.statusCode).to.equal(404);
  });

  it('should have a message property', () => {
    const error = new ChatterError(404, 'Not Found');
    expect(error.message).to.equal('Not Found');
  });

  it('should have a success property set to false', () => {
    const error = new ChatterError(404, 'Not Found');
    expect(error.success).to.equal(false);
  });

  it('should have a stack property', () => {
    const error = new ChatterError(404, 'Not Found', 'stack');
    expect(error.stack).to.equal('stack');
  });

  it('should have a default stack property', () => {
    const error = new ChatterError(404, 'Not Found');
    expect(error.stack).to.be.string;
  });
});
