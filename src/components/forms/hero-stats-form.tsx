'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { BarChart3, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { heroStatsSchema, type HeroStatsFormData } from '@/lib/validations'

interface HeroStatsFormProps {
  initialData?: Partial<HeroStatsFormData>
  onSubmit: (data: HeroStatsFormData) => Promise<void>
  isLoading?: boolean
}

export function HeroStatsForm({
  initialData,
  onSubmit,
  isLoading = false,
}: HeroStatsFormProps) {
  const form = useForm<HeroStatsFormData>({
    resolver: zodResolver(heroStatsSchema),
    defaultValues: {
      verifiedSkills: initialData?.verifiedSkills || 0,
      professionalProjects: initialData?.professionalProjects || 0,
      personalProjects: initialData?.personalProjects || 0,
    },
  })

  const handleSubmit = async (data: HeroStatsFormData) => {
    await onSubmit(data)
  }

  return (
    <Card className='glass-cosmic'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BarChart3 className='h-5 w-5' />
          Hero Statistics
        </CardTitle>
        <CardDescription>
          Update the statistics displayed in your portfolio hero section
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <FormField
                control={form.control}
                name='verifiedSkills'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verified Skills</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='0'
                        {...field}
                        onChange={e =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='professionalProjects'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Projects</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='0'
                        {...field}
                        onChange={e =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='personalProjects'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Projects</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='0'
                        {...field}
                        onChange={e =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' disabled={isLoading}>
              <Save className='mr-2 h-4 w-4' />
              {isLoading ? 'Saving...' : 'Save Hero Stats'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
