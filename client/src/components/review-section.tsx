import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Review, insertReviewSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ReviewSectionProps {
  destinationId: number;
}

export default function ReviewSection({ destinationId }: ReviewSectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: [`/api/destinations/${destinationId}/reviews`]
  });
  
  const form = useForm({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
      authorName: "",
      destinationId
    }
  });
  
  const mutation = useMutation({
    mutationFn: async (data: typeof form.getValues) => {
      await apiRequest("POST", `/api/destinations/${destinationId}/reviews`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/destinations/${destinationId}/reviews`] });
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!"
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    }
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{review.authorName}</span>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            className="focus:outline-none"
                            onClick={() => field.onChange(rating)}
                          >
                            <Star
                              className={`h-6 w-6 ${
                                rating <= field.value
                                  ? "fill-primary text-primary"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
