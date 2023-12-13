// @ts-nocheck
import React, { useState } from 'react';
import { Input, Select, Flex, CloseButton, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedValue } from '@mantine/hooks';
import { fakeAjaxRequest } from 'helpers/utils';

const initialValues = {
  option: null,
  abbreviation: null,
  duplicated: null,
  simpleName: '',
  location: '',
};

function SearchForm({ children }) {
  const form = useForm({
    initialValues,
  });

  const [page, setPage] = useState(1);

  const [debouncedValues] = useDebouncedValue(form.values, 500);

  const { isPending, isError, error, data } = useQuery({
    queryKey: ['items', page, { ...debouncedValues }],
    queryFn: () => fakeAjaxRequest('/fake-url', page, form.values),
    placeholderData: keepPreviousData,
  });

  const handleReset = () => {
    form.reset();
    setPage(1);
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log('submit', values);
      })}
    >
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

          <Button variant="filled" color="red" onClick={handleReset}>
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

        {/* Third Row */}
        <Flex>
          {isPending ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            React.cloneElement(children, {
              results: data.results,
              page,
              setPage,
              totalRecords: data.totalRecords,
            })
          )}
        </Flex>
        <Button fullWidth type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
}

export default SearchForm;
