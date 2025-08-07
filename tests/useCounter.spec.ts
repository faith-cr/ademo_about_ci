import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCounter from '../src/hooks/features/homepage/useCounter';

describe('useCounter', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('should increment count by val when increment is called', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should increment count by custom val when setVal is called', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(5);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(5);
    expect(result.current.val).toBe(5);
  });

  it('should increment count multiple times correctly', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(3);
    });
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(6);
  });

  it('should handle negative increment values', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(-2);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(-2);
  });

  it('should handle zero increment value', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(0);
    });
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(0);
  });

  it('should maintain separate state for count and val', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.setVal(10);
    });
    
    act(() => {
      result.current.increment();
    });
    
    act(() => {
      result.current.setVal(20);
    });
    
    // Count should remain 10, but val should be 20
    expect(result.current.count).toBe(10);
    expect(result.current.val).toBe(20);
    
    act(() => {
      result.current.increment();
    });
    
    // Now count should be 30 (10 + 20)
    expect(result.current.count).toBe(30);
  });

  it('should return all expected properties and functions', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(typeof result.current.count).toBe('number');
    expect(typeof result.current.val).toBe('number');
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.setVal).toBe('function');
  });
});