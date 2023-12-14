// @ts-nocheck
import React from 'react';
import { Input, Select, Flex, CloseButton, Button } from '@mantine/core';

function SearchForm({ form, onReset }) {
  return (
    <form>
      <Flex width="100%" direction="column" gap="md">
        {/* First Row */}
        <Flex gap="md" justify="center" align="flex-end">
          <Select
            style={{ flex: '1 1 0%;' }}
            label="Option"
            data={['Option A', 'Option B', 'Option C']}
            placeholder="Select"
            {...form.getInputProps('option')}
          />
          <Select
            style={{ flex: '1 1 0%;' }}
            label="Abbrevation"
            data={['Chi', 'Phi', 'UTA']}
            placeholder="Select"
            {...form.getInputProps('abbreviation')}
          />
          <Select
            style={{ flex: '1 1 0%;' }}
            label="Duplicated"
            data={['0', '1', '2', '3', '4', '5']}
            placeholder="Select"
            {...form.getInputProps('duplicated')}
          />

          <Button variant="filled" color="red" onClick={onReset}>
            Reset
          </Button>
        </Flex>

        {/* Second Row */}
        <Flex width="100%" gap="md" justify="center" align="flex-end">
          <Input
            style={{ flex: '1 1 0%;' }}
            label="Text Field 1"
            placeholder="Search Team Name"
            rightSectionPointerEvents="all"
            {...form.getInputProps('simpleName')}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => form.setFieldValue('simpleName', '')}
                style={{ display: form.values.simpleName ? undefined : 'none' }}
              />
            }
          />
          <Input
            style={{ flex: '1 1 0%;' }}
            label="Text Field 2"
            placeholder="Search Location"
            rightSectionPointerEvents="all"
            {...form.getInputProps('location')}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => form.setFieldValue('location', '')}
                style={{ display: form.values.location ? undefined : 'none' }}
              />
            }
          />
        </Flex>
      </Flex>
    </form>
  );
}

export default SearchForm;
