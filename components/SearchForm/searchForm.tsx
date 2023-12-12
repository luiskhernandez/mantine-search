import React, { useState, useEffect } from 'react';
import { Input, Select, Flex, CloseButton, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';
import { useDebouncedValue } from '@mantine/hooks';

function jsonToQueryString(json) {
  return (
    '?' +
    Object.entries(json)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  );
}

const fetchItems = async (page = 1, params) => {
  const response = await axios.get(`/api/items${jsonToQueryString(params)}&page=${page}`);
  return response.data;
};

const initialValues = {
  option: null,
  option1: null,
  option2: null,
  filter: '',
  filter2: '',
};

function SearchForm({ children }) {
  const form = useForm({
    initialValues,
  });

  const [page, setPage] = useState(1);

  const { isPending, isError, error, data, refetch } = useQuery({
    queryKey: ['items', page],
    queryFn: () => fetchItems(page, form.values),
    placeholderData: keepPreviousData,
  });

  const [debouncedValues] = useDebouncedValue(form.values, 500);

  useEffect(() => {
    refetch();
  }, [debouncedValues]);

  const handleReset = () => {
    form.reset();
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error!{JSON.stringify(error)}</div>;

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log('submit', values);
      })}
    >
      <Flex width="100%" direction={'column'} gap={'md'}>
        {/* First Row */}
        <Flex gap={'md'} justify={'center'} align="flex-end">
          <Select
            style={{ flex: '1 1 0%;' }}
            label="Option"
            data={['Option A', 'Option B', 'Option C']}
            placeholder="Select"
            {...form.getInputProps('option')}
          />
          <Select
            style={{ flex: '1 1 0%;' }}
            label="Option 2"
            data={['Option X', 'Option Y', 'Option Z']}
            placeholder="Select"
            {...form.getInputProps('option1')}
          />
          <Select
            style={{ flex: '1 1 0%;' }}
            label="Option 3"
            data={['Option P', 'Option Q', 'Option R']}
            placeholder="Select"
            {...form.getInputProps('option2')}
          />

          <Button variant="filled" color="red" onClick={handleReset}>
            Reset
          </Button>
        </Flex>

        {/* Second Row */}
        <Flex width="100%" gap="md" justify="center" align={'flex-end'}>
          <Input
            style={{ flex: '1 1 0%;' }}
            label="Text Field 1"
            placeholder="Type here"
            rightSectionPointerEvents="all"
            {...form.getInputProps('filter')}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => form.setFieldValue('filter', '')}
                style={{ display: form.values.filter ? undefined : 'none' }}
              />
            }
          />
          <Input
            style={{ flex: '1 1 0%;' }}
            label="Text Field 2"
            placeholder="Type here"
            rightSectionPointerEvents="all"
            {...form.getInputProps('filter2')}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={() => form.setFieldValue('filter2', '')}
                style={{ display: form.values.filter2 ? undefined : 'none' }}
              />
            }
          />
        </Flex>

        {/* Third Row */}
        <Flex>{React.cloneElement(children, { results: data, page: page, setPage: setPage })}</Flex>
        <Button fullWidth type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
}

export default SearchForm;
