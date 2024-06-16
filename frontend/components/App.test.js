import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import txt from '../i18n/index.json'

describe('Module 4 Project Tests', () => {
  describe('English Language', () => {
    const texts = getEntriesByKeyPrefix(txt.en, 'TEXT');
    texts.forEach(([key, val]) => {
      test(`${key} is visible`, () => {
        render(<App lang="en" />);
        expect(screen.getByText(val)).toBeVisible();
      });
    });
    const labels = getEntriesByKeyPrefix(txt.en, 'LABEL');
    labels.forEach(([key, val]) => {
      test(`${key} is visible`, () => {
        render(<App lang="en" />);
        const elements = screen.getAllByLabelText(val);
        elements.forEach((element) => {
          expect(element).toBeVisible();
        })
      })
    })
    test(`PLACEHOLDER_USERNAME is visible`, () => {
      render(<App lang="en" />)
      expect(screen.getByPlaceholderText(txt.en.PLACEHOLDER_USERNAME)).toBeVisible()
    })
  })


  describe('Spanish Language', () => {
    const texts = getEntriesByKeyPrefix(txt.esp, 'TEXT');
    texts.forEach(([key, val]) => {
      test(`${key} is visible`, () => {
        render(<App lang="esp" />);
        expect(screen.getByText(val)).toBeVisible();
      });
    });
    const labels = getEntriesByKeyPrefix(txt.esp, 'LABEL');
    labels.forEach(([key, val]) => {
      test(`${key} is visible`, () => {
        render(<App lang="esp" />);
        const elements = screen.getAllByLabelText(val);
        elements.forEach((element) => {
          expect(element).toBeVisible();
        });
      });
    });
    test(`PLACEHOLDER_USERNAME is visible`, () => {
      render(<App lang="esp" />)
      expect(screen.getByPlaceholderText(txt.esp.PLACEHOLDER_USERNAME)).toBeVisible()
    })
  })

  describe('getEntriesByKeyPrefix', () => {
    test('can extract the correct data', () => {
      const obj = {
        abc_1: "data_abc_1",
        abc_2: "data_abc_2",
        xyz_1: "data_xyz_1",
        abc_3: "data_abc_3",
      }
      const expected = [
        ["abc_1", "data_abc_1"],
        ["abc_2", "data_abc_2"],
        ["abc_3", "data_abc_3"],
      ]
      const expected2 = [
        ["xyz_1", "data_xyz_1"],
      ]
      expect(getEntriesByKeyPrefix(obj, "abc")).toEqual(expected)
      expect(getEntriesByKeyPrefix(obj, "xyz")).toEqual(expected2)
      expect(getEntriesByKeyPrefix(obj, "foo")).toEqual([])
    })
  })
})
function getEntriesByKeyPrefix(obj, keyPrefix) {
  return Object.entries(obj).filter(([key]) => key.startsWith(keyPrefix))
}
